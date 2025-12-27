from django.db import models

class Food(models.Model):
    CATEGORY_CHOICES = [
        ('pizza', 'Pizza'),
        ('burger', 'Burger'),
        ('indian', 'Indian'),
        ('chinese', 'Chinese'),
        ('dessert', 'Dessert'),
    ]

    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    image = models.ImageField(upload_to='foods/', blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    rating = models.FloatField(default=0)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.name
