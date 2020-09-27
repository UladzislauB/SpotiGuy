from rest_framework import permissions


class ReadCreateOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # Also allow POST requests in order to register new users.
        if request.method in permissions.SAFE_METHODS or request.method == 'POST':
            return True
