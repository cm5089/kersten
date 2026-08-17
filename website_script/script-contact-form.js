/* FRAPPE READY */

/* ================================================================
   CONTACT FORM MESSAGE AUTO-FILL
   Works with URLs such as:
   /Contact-us-2?message=HIRE%20ENQUIRY%3A%20Kersten...
   Also remains compatible with the fitment wizard.
   ================================================================ */
(function () {
    const params = new URLSearchParams(window.location.search);
    const message = params.get('message');

    // Only run when a message has been supplied in the URL.
    if (!message) return;

    // Limit this logic to the contact form page.
    const currentPath = window.location.pathname
        .replace(/\/+$/, '')
        .toLowerCase();

    if (currentPath !== '/contact-us-2') return;

    let completed = false;
    let attempts = 0;
    const maximumAttempts = 40;

    function setNativeValue(element, value) {
        if (!element) return false;

        const prototype =
            element.tagName === 'TEXTAREA'
                ? HTMLTextAreaElement.prototype
                : HTMLInputElement.prototype;

        const valueSetter = Object.getOwnPropertyDescriptor(
            prototype,
            'value'
        );

        if (valueSetter && valueSetter.set) {
            valueSetter.set.call(element, value);
        } else {
            element.value = value;
        }

        element.dispatchEvent(
            new Event('input', {
                bubbles: true
            })
        );

        element.dispatchEvent(
            new Event('change', {
                bubbles: true
            })
        );

        element.dispatchEvent(
            new Event('blur', {
                bubbles: true
            })
        );

        return element.value === value;
    }

    function findMessageField() {
        const selectors = [
            'textarea[name="message"]',
            'textarea[data-fieldname="message"]',
            '.frappe-control[data-fieldname="message"] textarea',
            '[data-fieldname="message"] textarea',
            'input[name="message"]',
            'input[data-fieldname="message"]',
            '.frappe-control[data-fieldname="message"] input',
            '[data-fieldname="message"] input'
        ];

        for (const selector of selectors) {
            const field = document.querySelector(selector);

            if (field) {
                return field;
            }
        }

        return null;
    }

    function fillMessageField() {
        if (completed) return;

        attempts += 1;

        // Prefer Frappe's own API when the web form is ready.
        try {
            if (
                window.frappe &&
                frappe.web_form &&
                typeof frappe.web_form.set_value === 'function'
            ) {
                frappe.web_form.set_value('message', message);
            }
        } catch (error) {
            console.warn(
                'Frappe message autofill API was not ready:',
                error
            );
        }

        const field = findMessageField();

        if (field) {
            setNativeValue(field, message);

            // Check again shortly in case Frappe redraws the field.
            setTimeout(function () {
                const currentField = findMessageField();

                if (currentField && currentField.value !== message) {
                    setNativeValue(currentField, message);
                }

                if (
                    currentField &&
                    currentField.value.trim() === message.trim()
                ) {
                    completed = true;
                }
            }, 250);
        }

        if (!completed && attempts < maximumAttempts) {
            setTimeout(fillMessageField, 250);
        }
    }

    // Run at several stages because Frappe may render the form late.
    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            fillMessageField,
            { once: true }
        );
    } else {
        fillMessageField();
    }

    window.addEventListener(
        'load',
        fillMessageField,
        { once: true }
    );

    // Watch for Frappe adding or replacing form elements.
    const observer = new MutationObserver(function () {
        if (completed) {
            observer.disconnect();
            return;
        }

        fillMessageField();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    setTimeout(function () {
        observer.disconnect();
    }, 12000);
})();