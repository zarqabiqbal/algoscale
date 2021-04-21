from django.http import JsonResponse
from server.models import ContactUs
from datetime import timedelta
from dateutil.parser import parse
from rest_framework import generics
from server.serializer import ContactUsSerializer
from rest_framework.views import APIView
# Create your views here.


class ContactUsView(generics.CreateAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer


class GetDataView(APIView):
    def post(self,request):
        if 'date1' not in request.POST:
            return JsonResponse({"date1":"This field is required"})
        if 'date2' not in request.POST:
            return JsonResponse({"date2":"This field is required"})
        try:
            date1 = parse(request.POST["date1"])
            date2 = parse(request.POST["date2"])
        except:
            return JsonResponse({'error':'Date format wrong'})
        date_range = date2 - date1
        return_data = dict()
        for i in range(date_range.days + 1):
            date = (date1 + timedelta(days=i)).strftime("%Y-%m-%d")
            return_data[date]=ContactUs.objects.filter(entry_date=date).count()
        return JsonResponse({'success':'Data saved successfully','data':return_data})


