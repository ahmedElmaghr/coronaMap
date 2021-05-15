#!/usr/bin/env python
# coding: utf-8

# In[1]:

import numpy as np
import pandas as pd
import requests
website_url = requests.get('https://www.worldometers.info/coronavirus/').text


# In[2]:


from bs4 import BeautifulSoup
soup = BeautifulSoup(website_url,'lxml')


# In[3]:


My_table = soup.find('table',{'id':'main_table_countries_today'})
body = soup.find('tbody')

#In[4]
from datetime import datetime
print(datetime.now())
# In[5]:


l = []
countries = soup.find_all('tr')
for tr in countries:
    td = tr.find_all('td')
    row = [tr.text for tr in td]
    l.append(row)
df = pd.DataFrame(l, columns=["#","Country", "TotalCases", "NewCases", "TotalDeaths",
                                "NewDeaths","TotalRecovered","NewRecovered","ActiveCases","Serious,Critical",
                                "Cases/1M pop","Death1m","TotalTest","Test1MPeople","population","region","1CaseEveryXPPL",
                                    "1DeathEveryXPPL","1TestEveryXPPL","temp","X","Y"])

# In[6]:


df = df.iloc[1:]
df


# In[7]:


df.to_csv("results_coronavirus.csv") 

