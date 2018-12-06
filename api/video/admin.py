from django.contrib import admin
from api.video.models import Video

# Register your models here.

class VideoAdmin(admin.ModelAdmin):
    model = Video

admin.site.register(Video, VideoAdmin)
