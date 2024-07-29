import json
import numpy as np
import pandas as pd
import datetime as dt
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import yfinance as yf

@csrf_exempt
def monte_carlo_simulation(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            stockList = data.get('stocks')
            startDate = dt.datetime.strptime(data.get('start_date'), '%Y-%m-%d')
            endDate = dt.datetime.strptime(data.get('end_date'), '%Y-%m-%d')
            numOfSims = float(data.get('num_simulations', 100))
            initialfolioValue = float(data.get('initial_value', 10000))

            if not stockList:
                return JsonResponse({'error': 'No stocks provided'}, status=400)

            meanReturns, covMatrix = get_data(stockList, startDate, endDate)

            if meanReturns.empty or covMatrix.empty:
                return JsonResponse({'error': 'Error fetching or processing stock data'}, status=500)

            weights = np.random.random(len(meanReturns))
            weights /= np.sum(weights)

            numOfDays = (endDate - startDate).days

            meanMatrix = np.full(shape=(numOfDays, len(weights)), fill_value=meanReturns)
            meanMatrix = meanMatrix.T
            portfolio_sims = np.full(shape=(numOfDays, numOfSims), fill_value=0.0)

            for m in range(numOfSims):
                x = np.random.normal(size=(numOfDays, len(weights)))
                y = np.linalg.cholesky(covMatrix)
                dailyReturns = meanMatrix + np.inner(y, x)
                portfolio_sims[:, m] = np.cumprod(np.inner(weights, dailyReturns.T) + 1) * initialfolioValue

            results = portfolio_sims.tolist()
            return JsonResponse({'results': results})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)
        except ValueError as ve:
            return JsonResponse({'error': str(ve)}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

def get_data(stocks, start_date, end_date):
    try:
        stockData = yf.download(stocks, start=start_date, end=end_date)['Close']
        returns = stockData.pct_change().dropna()
        meanReturns = returns.mean()
        covMatrix = returns.cov()
        return meanReturns, covMatrix
    except Exception as e:
        print(f"Error fetching data: {e}")
        return pd.Series(), pd.DataFrame()
