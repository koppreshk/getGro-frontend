(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var defaultId = "ggfeedbackwidgetframe";
        var container = document.getElementById(defaultId);

        if (!container) {
            // Create a default container if one doesn't exist
            container = document.createElement("div");
            container.id = defaultId;
            document.body.appendChild(container);
        }

        // Get user-specified attributes
        // var formId = container.getAttribute("data-form-id") || "default-form-id";
        var height = container.getAttribute("data-height") || "400";

        // Create the iframe
        var iframe = document.createElement("iframe");
        iframe.className = "getgrowidgetform";
        iframe.height = height;
        iframe.allowTransparency = "false";
        iframe.frameBorder = "0";
        iframe.border = "0";
        iframe.src = `${import.meta.env.VITE_SUB_DOMAIN}/webform`;

        // Inject the iframe
        container.replaceWith(iframe);
    });
})();
