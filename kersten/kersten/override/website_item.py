import frappe.utils
from webshop.webshop.doctype.website_item.website_item import WebsiteItem as _WebsiteGenerator, update_index_for_item, invalidate_item_variants_cache_for_website
import frappe
from kersten.kersten.doctype.website_itemgroup.website_itemgroup import get_parent_item_groups
from frappe import _
from frappe.website.utils import clear_cache

PLACEHOLDER_IMAGE = "/private/files/webstore_placeholder.png"

# Human readable titles used for each section
# Indetifier is used as section HTML ID
# "IDENTIFIER": "HUMAN READABLE TITLE"
SECTION_TITLES = {
        "Consumables": "Consumables",
        "RequiredExtras": "Required Extras",
        "OptionalAccessories": "Optional Accessories",
        "Downloads": "Downloads",
        "SeriesCollection": "More from this Series",
        "RelatedItems": "Related Items",
        "CompatiblePowerUnits": "Compatible Power Units",
        "CompatibleLinkage": "Compatible Linkage",
        "CompatibleAttachments": "Compatible Attachments",
        "CompatibleBrackets": "Compatible Brackets",
    }



class WebsiteItem(_WebsiteGenerator):
	website = frappe._dict(
		page_title_field="web_item_name",
		condition_field="published",
		template="templates/generators/item/item.html",
		no_cache=1,
	)

	def get_context(self, context):
		context = super().get_context(context)
		context.full_witdh = 1

		# Load data for Jinga templates
		context.override_page_builder = self.custom_override_page_builder
		if self.custom_override_page_builder:

			context.SECTION_TITLES = SECTION_TITLES
			# Map sections to field names in ERPNext and filter unpublished products
			context.related_items_by_groups = {}
			self.filter_website_items(context.related_items_by_groups, "Consumables", self.custom_comsumables)
			self.filter_website_items(context.related_items_by_groups, "RequiredExtras", self.custom_required_extras)
			self.filter_website_items(context.related_items_by_groups, "OptionalAccessories", self.custom_accessories)
			self.filter_website_items(context.related_items_by_groups, "Downloads", self.custom_downloads)
			self.filter_website_items(context.related_items_by_groups, "SeriesCollection", self.custom_seriescollection)
			self.filter_website_items(context.related_items_by_groups, "RelatedItems", self.recommended_items)
			context.compatible_items_by_groups = {}
			self.filter_website_items(context.compatible_items_by_groups, "CompatiblePowerUnits", self.custom_compatible_power_units)
			self.filter_website_items(context.compatible_items_by_groups, "CompatibleLinkage", self.custom_compatible_linkage)
			self.filter_website_items(context.compatible_items_by_groups, "CompatibleAttachments", self.custom_compatible_attachments)
			self.filter_website_items(context.compatible_items_by_groups, "CompatibleBrackets", self.custom_compatible_brackets)


		# WebsiteItemGroup
		website_itemgroup = None

		if self.website_item_groups:
			website_itemgroup = self.website_item_groups[0].website_itemgroup

		context.parents = get_parent_item_groups(
			website_itemgroup, from_item=True
		)  # breadcumbs
		return context

	def get_clean_route(self):
		route = self.route
		if not route.startswith("/"):
			route = "/" + route
		if route.endswith("/"):
			route = route[:-1]
		return route

	def has_specification(self):
		return (self.website_specifications is not None and len(self.website_specifications) > 0)

	def has_long_description(self):
		return frappe.utils.strip_html(self.web_long_description or '') != ''

	def filter_website_items(self, dict_to_append, group_name, items):
		filtered_items = [item.website_item for item in items if frappe.db.get_value("Website Item", item.website_item, "published")]
		if len(filtered_items) > 0:
			dict_to_append[group_name] = filtered_items
		return dict_to_append

	def get_tabs(self):
		tab_values = {}

		website_template = ''
		if frappe.utils.strip_html(self.web_long_description or ''):
			website_template = self.web_long_description
		elif frappe.utils.strip_html(self.description or ''):
			website_template = self.description

		doc = frappe.get_doc("Item", self.item_code)
		index = 1

		if website_template:
			tab_values[f"tab_{index}_title"] = "More Information"
			tab_values[f"tab_{index}_content"] = frappe.render_template(
				"templates/generators/item/item_description.html",
				{
					"website_description": website_template,
				},
			)
			index += 1

		if doc.specifications:
			tab_values[f"tab_{index}_title"] = "Product Details"
			tab_values[f"tab_{index}_content"] = frappe.render_template(
				"templates/generators/item/item_specifications.html",
				{
					"website_specifications": doc.specifications,
					"show_tabs": self.show_tabbed_section,
				},
			)

			index += 1

		if doc.optional_accessories:
			tab_values[f"tab_{index}_title"] = "Accessories"
			tab_values[f"tab_{index}_content"] = frappe.render_template(
				"templates/generators/item/item_accessories.html",
				{
					"doc": self,
				},
			)

		if doc.spares:
			tab_values[f"tab_{index}_title"] = "Spares"
			tab_values[f"tab_{index}_content"] = frappe.render_template(
				"templates/generators/item/item_spares.html",
				{
					"doc": self,
				},
			)

			index += 1

		for row in self.tabs:
			tab_values[f"tab_{row.idx + index}_title"] = _(row.label)
			tab_values[f"tab_{row.idx + index}_content"] = row.content

		return tab_values

	def on_update(self):
		invalidate_cache_for_web_item(self)
		self.update_template_item()


def invalidate_cache_for_web_item(doc):
	"""
	Invalidate Website Item Group cache and rebuild ItemVariantsCacheManager
	Args:
		doc (Item): document against which cache should be cleared
	"""
	invalidate_cache_for(doc)

	website_item_groups = list(
		set(
			(doc.get("old_website_item_groups") or [])
			+ [
				d.website_itemgroup
				for d in doc.get({"doctype": "Website Item Group"})
				if d.website_itemgroup
			]
		)
	)


	for item_group in website_item_groups:
		invalidate_cache_for(doc, item_group)

	# Update Search Cache
	update_index_for_item(doc)

	invalidate_item_variants_cache_for_website(doc)


def invalidate_cache_for(doc, item_group=None):
	if not item_group:
		item_group = doc.item_group

	if doc.doctype == "Website Itemgroup":
		item_group = doc.name

		for d in get_parent_item_groups(item_group):
			item_group_name = frappe.db.get_value("Website Itemgroup", d.get("name"))
			if item_group_name:
				clear_cache(frappe.db.get_value("Website Itemgroup", item_group_name, "route"))

	if doc.doctype == "Website Item":
		for row in doc.get("website_item_groups"):
			item_group = row.website_itemgroup

			for d in get_parent_item_groups(item_group):
				item_group_name = frappe.db.get_value("Website Itemgroup", d.get("name"))
				if item_group_name:
					clear_cache(frappe.db.get_value("Website Itemgroup", item_group_name, "route"))

# @frappe.whitelist()
# def get_faq_questions_from_website_itemgroup(doc):
# 	doc = frappe._dict(frappe.parse_json(doc))
# 	faq_list = []
# 	for row in doc.get('website_item_groups', []):
# 		if row.get("website_itemgroup"):
# 			website_itemgroup_doc = frappe.get_doc("Website Itemgroup", row['website_itemgroup'])

# 			for faq in website_itemgroup_doc.faq:
# 				faq_list.append({
# 					'question': faq.question,
# 				})

# 	return faq_list