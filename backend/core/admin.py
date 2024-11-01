from django.contrib import admin
from .models import CustomUser


class NormalUser(CustomUser):
    class Meta:
        proxy = True


class StaffUser(CustomUser):
    class Meta:
        proxy = True


class NormalUserAdmin(admin.ModelAdmin):
    list_display = ["email", "first_name", "last_name", "is_active"]
    list_filter = ["is_active"]
    search_fields = ["email", "first_name", "last_name"]
    ordering = ["email"]
    readonly_fields = [
        "email",
        "password",
        "first_name",
        "last_name",
        "is_active",
        "last_login",
        "date_joined",
    ]

   
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password",
                    "first_name",
                    "last_name",
                    "is_active",
                    "date_joined",
                    "last_login",
                )
            },
        ),
        (
            "Staff Status",
            {
                "fields": ("is_staff",),  
            },
        ),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_staff=False)

    def make_staff(self, request, queryset):
        """Custom action to make selected users staff."""
        queryset.update(is_staff=True)

    make_staff.short_description = "Make selected users staff"

    actions = [make_staff]


class StaffUserAdmin(admin.ModelAdmin):
    list_display = ["email", "first_name", "last_name", "is_active"]
    list_filter = ["is_active"]
    search_fields = ["email", "first_name", "last_name"]
    ordering = ["email"]
    readonly_fields = [
        "email",
        "password",
        "username",
        "first_name",
        "last_name",
        "is_active",
        "last_login",
        "date_joined",
    ]

    def get_queryset(self, request):
        return super().get_queryset(request).filter(is_staff=True)


admin.site.register(NormalUser, NormalUserAdmin)
admin.site.register(StaffUser, StaffUserAdmin)
