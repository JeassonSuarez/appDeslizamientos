import asyncio
import aiohttp
import serial
import re
import json
import datetime
import aiocron
from apscheduler.schedulers.asyncio import AsyncIOScheduler

arduino = serial.Serial('COM3',9600)
array_data=[]
async def ajustes(t):
    ni=0
    na=5
    R=(t-255)*(na-ni)/255
    R=R+na
    return R
async def update_data():
    data = arduino.readline().decode("utf-8").strip('\n').strip('\r')
    data1 =int(re.sub(r'[^0-9]', '', data))
    #data1=  await ajustes(data1)
    array_data.append({"data":data1,"fecha":str(datetime.datetime.now())})
    print(len(array_data))
    
    



async def hacer_peticion(url, data,headers):
    async with aiohttp.ClientSession() as session:
        async with session.post(url, data=data ,headers=headers) as response:
            content = await response.text()
            array_data.clear()
            return content

async def main():
    url = "http://localhost:3001/crearDatos"
    data = {
        "p1": json.dumps(array_data),
        "p2": "value2",                
        "p3": "value3",
        "p4": "value4"
    }
    # Convertir los datos a formato JSON
    data_json = json.dumps(data)
# Definir los encabezados
    headers = {
        "Content-Type": "application/json"
    }
    content = await hacer_peticion(url,data=data_json,headers=headers)
    print("Contenido:", content)

@aiocron.crontab('* * * * *')
async def tarea  ():
    await main()

async def tarea2  ():
    await update_data()

scheduler = AsyncIOScheduler()

# Programa una tarea para que se ejecute cada 5 segundos
scheduler.add_job(tarea2, 'interval', seconds=1)    


loop = asyncio.get_event_loop()

try:
    scheduler.start()
    loop.run_forever()
        # Ejecuta las tareas programadas por schedule
        # Espera un pequeño intervalo de tiempo antes de revisar nuevamente las tareas programadas
except KeyboardInterrupt as K:
    print(K)

loop.close()
