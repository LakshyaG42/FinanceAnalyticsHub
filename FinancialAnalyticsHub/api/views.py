import json
import numpy as np
import datetime as dt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pandas_datareader import data as pdata
import yfinance as yf

@csrf_exempt
def monte_carlo_simulation(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        stockList = data.get('stocks')
        startDate = dt.datetime.strptime(data.get('start_date'), '%Y-%m-%d')
        endDate = dt.datetime.strptime(data.get('end_date'), '%Y-%m-%d')
        numOfSims = data.get('num_simulations', 100)
        initialfolioValue = data.get('initial_value', 10000)

        if not stockList:
            return JsonResponse({'error': 'No stocks provided'}, status=400)

        meanReturns, covMatrix = get_data(stockList, startDate, endDate)

        weights = np.random.random(len(meanReturns))
        weights /= np.sum(weights)

        numOfDays = (endDate - startDate).days

        meanMatrix = np.full(shape=(numOfDays, len(weights)), fill_value=meanReturns)
        meanMatrix = meanMatrix.T
        portfolio_sims = np.full(shape=(numOfDays, numOfSims), fill_value=0.0)

        for m in range(0, numOfSims):
            x = np.random.normal(size=(numOfDays, len(weights)))
            y = np.linalg.cholesky(covMatrix)
            dailyReturns = meanMatrix + np.inner(y, x)
            portfolio_sims[:, m] = np.cumprod(np.inner(weights, dailyReturns.T) + 1) * initialfolioValue

        results = portfolio_sims.tolist()
        return JsonResponse({'results': results})

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def get_data(stocks, start_date, end_date):
    stockData = yf.download(stocks, start=start_date, end=end_date)['Close']
    returns = stockData.pct_change()
    meanReturns = returns.mean()
    covMatrix = returns.cov()
    return meanReturns, covMatrix
