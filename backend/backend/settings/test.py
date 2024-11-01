from .dev import *  # Import everything from base settings

# Override settings specifically for testing
EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"
