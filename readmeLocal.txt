curl -c ccookie.txt -d "API_KEY_NAME=ACCESS_TOKEN" -d "API_KEY_VALUE=90K34K3049J309J4F390JF4390JF3094F00JF3JF309FJ" -u sk_test_51KSmlJGnWsOieF5WQf1WuGIsj7mUJ3n2VnjZX8zKDng3F1TiyIcuI3vbHI29kJ1L32Otnc8p84kmh1HadU7mGLnJ005BV3DxK9 https://spipe.herokuapp.com/

curl https://spipe.herokuapp.com/tokens \
  -u sk_test_51KSmlJGnWsOieF5WQf1WuGIsj7mUJ3n2VnjZX8zKDng3F1TiyIcuI3vbHI29kJ1L32Otnc8p84kmh1HadU7mGLnJ005BV3DxK9: \
  -d "card[number]"=4242424242424242 \
  -d "card[exp_month]"=2 \
  -d "card[exp_year]"=2023 \
  -d "card[cvc]"=314


  curl https://spipe.herokuapp.com/tokens \
   -d "card[number]"=4242424242424242 \
   -d "card[exp_month]"=2 \
   -d "card[exp_year]"=2023 \
   -d "card[cvc]"=313

  curl http://localhost:3000/tokens \
   -d "card[number]"=4242424242424242 \
   -d "card[exp_month]"=2 \
   -d "card[exp_year]"=2023 \
   -d "card[cvc]"=313


  curl http://localhost:3000/tokens \
   -u ACCESS_KEY:90K34K3049J309J4F390JF4390JF3094F00JF3JF309FJ \
   -d "card[number]"=4242424242424242 \
   -d "card[exp_month]"=2 \
   -d "card[exp_year]"=2023 \
   -d "card[cvc]"=313


   curl http://localhost:3000/charges \
      -u ACCESS_KEY:90K34K3049J309J4F390JF4390JF3094F00JF3JF309FJ \
      -d amount=200 \
      -d currency=brl \
      -d source=tok_1KSsOtGnWsOieF5WCK1Surj7 \
      -d description="My First Test Charge (created for API docs)"


sk_test_51KSmlJGnWsOieF5WQf1WuGIsj7mUJ3n2VnjZX8zKDng3F1TiyIcuI3vbHI29kJ1L32Otnc8p84kmh1HadU7mGLnJ005BV3DxK9

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