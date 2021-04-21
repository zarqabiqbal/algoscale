from django.db import models

# Create your models here.
class ContactUs(models.Model):

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=254)
    message = models.CharField(max_length=500)
    entry_date = models.DateField(auto_now_add=True)

    class Meta:
        db_table = "contact_us"
