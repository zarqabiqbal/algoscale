from rest_framework import  serializers
from server.models import ContactUs


class ContactUsSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=30,required=True)
    last_name = serializers.CharField(max_length=30,required=True)
    email = serializers.EmailField(max_length=254, required=True)
    message = serializers.CharField(max_length=500,required=True)

    class Meta:
        model = ContactUs
        fields = ('first_name', 'last_name', 'email', 'message',)

    def create(self, validated_data):
        return ContactUs.objects.create(**validated_data)
