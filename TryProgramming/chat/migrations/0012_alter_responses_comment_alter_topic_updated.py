# Generated by Django 4.1.5 on 2023-03-14 06:06

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0011_alter_field_category_alter_topic_updated'),
    ]

    operations = [
        migrations.AlterField(
            model_name='responses',
            name='comment',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='comment', to='chat.comments'),
        ),
        migrations.AlterField(
            model_name='topic',
            name='updated',
            field=models.DateTimeField(blank=True, null=True, verbose_name=datetime.datetime(2023, 3, 14, 6, 6, 26, 11829)),
        ),
    ]
