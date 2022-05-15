from django.contrib import admin
from . import models
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserAdmin(BaseUserAdmin):

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id', 'email', 'fname', 'mname',
                    'lname', 'phone', 'role',  'is_admin')
    list_filter = ('is_admin',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {
         'fields': ('fname', 'mname', 'lname', 'phone', 'role')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'fname', 'mname', 'lname', 'phone', 'role', 'password1', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email', 'id')
    filter_horizontal = ()

class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('id','name')


# Now register the new UserAdmin...
admin.site.register(models.UserData, UserAdmin)
admin.site.register(models.RoleAssigned)
admin.site.register(models.UserInfo, UserInfoAdmin)
