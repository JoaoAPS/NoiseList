# Generated by Django 3.0.8 on 2020-08-04 00:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('languages', '0002_language_imagefilename'),
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('defaultLanguage', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='languages.Language')),
            ],
        ),
    ]
