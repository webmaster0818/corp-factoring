"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FeeSimulator() {
  const [amount, setAmount] = useState<number>(1000000);
  const [days, setDays] = useState<number>(30);
  const [results, setResults] = useState<{
    minFee: number;
    maxFee: number;
    minReceived: number;
    maxReceived: number;
  } | null>(null);

  const calculateFee = () => {
    // 一般的な手数料範囲: 1%〜20%
    const minFeeRate = 0.01; // 1%
    const maxFeeRate = 0.20; // 20%

    // 期間による手数料補正
    const daysMultiplier = days <= 7 ? 1.5 : days <= 30 ? 1.0 : 0.8;

    const minFee = Math.floor(amount * minFeeRate * daysMultiplier);
    const maxFee = Math.floor(amount * maxFeeRate * daysMultiplier);
    const minReceived = amount - maxFee;
    const maxReceived = amount - minFee;

    setResults({
      minFee,
      maxFee,
      minReceived,
      maxReceived,
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ja-JP').format(num);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          💰 手数料シミュレーター
        </CardTitle>
        <p className="text-center text-sm text-gray-600">
          売掛金額と入金までの期間を入力して、手数料を試算してみましょう
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 入力フォーム */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* 売掛金額 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                売掛金額
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="1000000"
                  min="10000"
                  step="10000"
                />
                <span className="absolute right-4 top-3 text-gray-500">円</span>
              </div>
              <div className="mt-2 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(500000)}
                  className="text-xs"
                >
                  50万円
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(1000000)}
                  className="text-xs"
                >
                  100万円
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(3000000)}
                  className="text-xs"
                >
                  300万円
                </Button>
              </div>
            </div>

            {/* 入金までの期間 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                入金までの期間
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="30"
                  min="1"
                  max="180"
                />
                <span className="absolute right-4 top-3 text-gray-500">日</span>
              </div>
              <div className="mt-2 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDays(7)}
                  className="text-xs"
                >
                  1週間
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDays(30)}
                  className="text-xs"
                >
                  1ヶ月
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDays(60)}
                  className="text-xs"
                >
                  2ヶ月
                </Button>
              </div>
            </div>
          </div>

          {/* 計算ボタン */}
          <div className="text-center">
            <Button
              onClick={calculateFee}
              className="px-8 py-6 text-lg font-semibold"
            >
              手数料を試算する →
            </Button>
          </div>

          {/* 結果表示 */}
          {results && (
            <div className="mt-8 space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  試算結果
                </h3>
                <p className="text-sm text-gray-600">
                  ※ 実際の手数料は審査や条件により異なります
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* 手数料 */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-sm text-blue-700 mb-2">手数料（目安）</div>
                    <div className="text-3xl font-bold text-blue-900 mb-1">
                      {formatNumber(results.minFee)}〜{formatNumber(results.maxFee)}円
                    </div>
                    <div className="text-sm text-blue-600">
                      （{((results.minFee / amount) * 100).toFixed(2)}%〜
                      {((results.maxFee / amount) * 100).toFixed(2)}%）
                    </div>
                  </div>
                </div>

                {/* 入金額 */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-sm text-green-700 mb-2">
                      実際の入金額（目安）
                    </div>
                    <div className="text-3xl font-bold text-green-900 mb-1">
                      {formatNumber(results.minReceived)}〜
                      {formatNumber(results.maxReceived)}円
                    </div>
                    <div className="text-sm text-green-600">
                      売掛金 {formatNumber(amount)}円から
                    </div>
                  </div>
                </div>
              </div>

              {/* 補足情報 */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  💡 手数料を抑えるポイント
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>2社間より3社間ファクタリングの方が手数料が安い（1%〜10%）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>売掛金額が大きいほど手数料率が低くなる傾向</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>入金までの期間が短いほど手数料が抑えられる</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span>信用力の高い売掛先の方が審査に有利</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-600 mb-4">
                  正確な見積もりは各社の無料査定をご利用ください
                </p>
                <Button variant="outline" className="px-6">
                  おすすめ会社を見る →
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
