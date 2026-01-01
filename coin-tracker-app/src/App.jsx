import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const onSelectChange = (event) => {
    setSelectedPrice(event.target.value);
  };

  // 입력값이 바뀔 때마다 amount 업데이트
  const onChange = (event) => {
    setAmount(event.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        if (json.length > 0) setSelectedPrice(json[0].quotes.USD.price);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input
            value={amount}
            onChange={onChange}
            type="number"
            placeholder="How much USD?"
          />
          <select onChange={onSelectChange}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>

          {/* 1. 계산 결과 표시 영역 추가 */}
          <div style={{ marginTop: "20px" }}>
            <hr />
            <h3>Result:</h3>
            {/* 2. 내 돈 / 코인 가격 계산 (소수점 처리 포함) */}
            <p>
              You can get
              <strong>
                {selectedPrice > 0 ? (amount / selectedPrice).toFixed(6) : 0}
              </strong>
              coins.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
