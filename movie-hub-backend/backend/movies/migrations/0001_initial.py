# Generated by Django 5.2.4 on 2025-07-19 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('adult', models.BooleanField()),
                ('backdrop_path', models.CharField(blank=True, max_length=500, null=True)),
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('overview', models.TextField(blank=True, null=True)),
                ('original_language', models.CharField(max_length=20)),
                ('poster_path', models.CharField(blank=True, max_length=500, null=True)),
                ('popularity', models.FloatField()),
                ('release_date', models.DateField(blank=True, null=True)),
                ('vote_average', models.FloatField()),
                ('vote_count', models.IntegerField()),
                ('genres', models.ManyToManyField(to='movies.genre')),
            ],
        ),
    ]
