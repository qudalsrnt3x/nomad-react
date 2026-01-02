import {
  HashRouter as Router, // 전체 라우팅 엔진 (보통 Router로 별칭 사용)
  Routes, // Route들의 집합 (v5의 Switch 역할)
  Route // 개별 URL 경로와 컴포넌트 매칭
} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie/:id" element={<Detail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
