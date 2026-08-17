import { describe, expect, it } from "vitest";
import { QUIZ_USTA_ESIK, quizSonuc, quizSorulari } from "./quiz";

describe("quizSorulari", () => {
  it("16 soru ve dört alan içerir", () => {
    expect(quizSorulari).toHaveLength(16);
    const alanlar = new Set(quizSorulari.map((s) => s.alan));
    expect(alanlar.size).toBe(4);
  });

  it("her soruda dört şık ve geçerli doğru cevap var", () => {
    for (const s of quizSorulari) {
      expect(s.secenekler).toHaveLength(4);
      expect(s.dogru).toBeGreaterThanOrEqual(0);
      expect(s.dogru).toBeLessThan(4);
      expect(s.soru.length).toBeGreaterThan(0);
      expect(new Set(s.secenekler).size).toBe(4);
    }
  });
});

describe("quizSonuc", () => {
  it("tümü doğru: %100", () => {
    const cevaplar = quizSorulari.map((s) => s.dogru);
    const sonuc = quizSonuc(cevaplar);
    expect(sonuc.dogru).toBe(quizSorulari.length);
    expect(sonuc.yuzde).toBe(100);
  });

  it("tümü yanlış: %0", () => {
    const cevaplar = quizSorulari.map((s) => (s.dogru + 1) % 4);
    expect(quizSonuc(cevaplar).yuzde).toBe(0);
  });

  it("eşik hesabı: 13 doğru %81 (usta)", () => {
    const cevaplar = quizSorulari.map((s, i) => (i < 13 ? s.dogru : (s.dogru + 1) % 4));
    const sonuc = quizSonuc(cevaplar);
    expect(sonuc.dogru).toBe(13);
    expect(sonuc.yuzde).toBeGreaterThanOrEqual(QUIZ_USTA_ESIK);
  });

  it("12 doğru %75 (usta değil)", () => {
    const cevaplar = quizSorulari.map((s, i) => (i < 12 ? s.dogru : (s.dogru + 1) % 4));
    expect(quizSonuc(cevaplar).yuzde).toBeLessThan(QUIZ_USTA_ESIK);
  });
});