function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-stock-blue text-white p-4 shadow-lg">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold">StockPlay</h1>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="bg-stock-red p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-stock-black">
              수출 데이터 기반 주식 트레이딩 시그널
            </h2>
            <p className="text-lg text-stock-gray">
              관세청 수출 데이터를 활용하여 매월 자동으로 투자 시그널을 생성합니다
            </p>
          </section>

          {/* Feature Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-stock-blue p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-stock-blue">자동화</h3>
              <p className="text-stock-gray">매월 1일 10:20 자동 분석</p>
            </div>
            
            <div className="bg-white border-2 border-stock-blue p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-stock-blue">높은 정확도</h3>
              <p className="text-stock-gray">75% 승률, 11% 평균 수익률</p>
            </div>
            
            <div className="bg-white border-2 border-stock-blue p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-stock-blue">비용 효율</h3>
              <p className="text-stock-gray">월 $3 미만 운영</p>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-gradient-to-r from-stock-blue to-stock-red/30 p-8 rounded-lg text-white">
            <h3 className="text-2xl font-bold mb-6">백테스트 성과 (2020-2024)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold">11%</div>
                <div className="text-sm mt-2">평균 수익률</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">75%</div>
                <div className="text-sm mt-2">승률</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">1.8</div>
                <div className="text-sm mt-2">Sharpe Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">1,247</div>
                <div className="text-sm mt-2">총 신호수</div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-stock-gray text-white p-4 mt-12">
        <div className="container mx-auto max-w-7xl text-center">
          <p>© 2025 StockPlay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
