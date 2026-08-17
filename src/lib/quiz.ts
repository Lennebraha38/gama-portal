export type QuizSorusu = {
  alan: string;
  soru: string;
  secenekler: string[];
  dogru: number;
};

export const QUIZ_USTA_ESIK = 80;

export const quizSorulari: QuizSorusu[] = [
  {
    alan: "Uzay Teknolojileri",
    soru: "Bir uydunun Dünya yörüngesinde kalabilmesi için hızı en az hangi seviyede olmalıdır?",
    secenekler: ["11,2 km/s", "7,9 km/s", "5,5 km/s", "3,0 km/s"],
    dogru: 1,
  },
  {
    alan: "Uzay Teknolojileri",
    soru: "Türkiye'nin ilk yerli ve millî haberleşme uydusu hangisidir?",
    secenekler: ["Türksat 5A", "Rasat", "Göktürk-2", "İMECE"],
    dogru: 0,
  },
  {
    alan: "Uzay Teknolojileri",
    soru: "Bir roketin yakıt deposunu hızla terk eden gazların itiş gücüne dönüşmesi hangi fizik yasasıyla açıklanır?",
    secenekler: ["Bernoulli ilkesi", "Newton'un üçüncü yasası", "Arşimet ilkesi", "Ohm yasası"],
    dogru: 1,
  },
  {
    alan: "Uzay Teknolojileri",
    soru: "İnsanlı uzay görevleri için kullanılan, Dünya'ya dönerken atmosfere sürtünmeden korunmayı sağlayan kaplama hangisidir?",
    secenekler: ["Isı kalkanı", "Radyatör paneli", "Güneş yelkeni", "Manyetik koruma"],
    dogru: 0,
  },
  {
    alan: "Yapay Zekâ",
    soru: "Bir modelin öğrenirken hatasını geriye doğru yayarak ağırlıkları güncellediği algoritma hangisidir?",
    secenekler: ["Geri yayılım", "K-ortalamalar", "Karar ağacı budama", "Gaussian eliminasyon"],
    dogru: 0,
  },
  {
    alan: "Yapay Zekâ",
    soru: "Metin üreten büyük dil modellerinin çalıştığı temel görev aşağıdakilerden hangisidir?",
    secenekler: ["Sonraki belirteci tahmin etmek", "Görüntüyü sıkıştırmak", "Veritabanını indekslemek", "Grafik çizmek"],
    dogru: 0,
  },
  {
    alan: "Yapay Zekâ",
    soru: "Modelin eğitimde görmediği veriyle başarısını ölçmek için ayrılan küme hangisidir?",
    secenekler: ["Doğrulama kümesi", "Test kümesi", "Etiket kümesi", "Çekirdek kümesi"],
    dogru: 1,
  },
  {
    alan: "Yapay Zekâ",
    soru: "Bir görüntü sınıflandırma modelini kandırmak için yapılan, insana görünmeyen küçük bozulmalara ne ad verilir?",
    secenekler: ["Adversarial saldırı", "Overfitting", "Data leakage", "Transfer öğrenme"],
    dogru: 0,
  },
  {
    alan: "Yazılım",
    soru: "Git'te bir projenin kendi kopyası üzerinde değişiklik yapıp ana projeye önerme mekanizmasına ne denir?",
    secenekler: ["Merge request / Pull request", "Commit squash", "Branch switch", "Rebase conflict"],
    dogru: 0,
  },
  {
    alan: "Yazılım",
    soru: "Bir fonksiyonun çalışma süresinin girdi boyutuna göre logaritmik arttığını ifade eden Big-O gösterimi hangisidir?",
    secenekler: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    dogru: 1,
  },
  {
    alan: "Yazılım",
    soru: "İki yazılım sisteminin birbirinden bağımsız çalışabilmesini sağlayan tasarım ilkesine ne ad verilir?",
    secenekler: ["Gevşek bağlılık", "Sıkı bağlılık", "Monolitik mimari", "Nesne havuzu"],
    dogru: 0,
  },
  {
    alan: "Yazılım",
    soru: "Açık kaynak yazılımda bir hatayı bildiren ve tartışma için kullanılan platform aşağıdakilerden hangisidir?",
    secenekler: ["Issue tracker", "Code linter", "Package manager", "CI pipeline"],
    dogru: 0,
  },
  {
    alan: "Robotik",
    soru: "Bir robotun algılayıcı verisini kullanarak bulunduğu konumu belirlemesine ne ad verilir?",
    secenekler: ["Lokalizasyon", "Kalibrasyon", "Serbestleştirme", "Orbitasyon"],
    dogru: 0,
  },
  {
    alan: "Robotik",
    soru: "PID kontrolörde P harfi aşağıdakilerden hangisini ifade eder?",
    secenekler: ["Oransal (Proportional)", "Konum (Position)", "Güç (Power)", "Ölçüm (Probe)"],
    dogru: 0,
  },
  {
    alan: "Robotik",
    soru: "Bir dört tekerlekli robotun tekerleklerini bağımsız süren motorlara ne ad verilir?",
    secenekler: ["Aktüatör", "Potansiyometre", "Jiroskop", "Enkoder"],
    dogru: 0,
  },
  {
    alan: "Robotik",
    soru: "Robotikte bir görevi alt görevlere ayırıp planlayan yazılım katmanı hangisidir?",
    secenekler: ["Görev planlayıcı", "Güç kaynağı", "Şasi tasarımı", "İletişim protokolü"],
    dogru: 0,
  },
];

export function quizSonuc(cevaplar: number[]): { dogru: number; toplam: number; yuzde: number } {
  const toplam = quizSorulari.length;
  let dogru = 0;
  cevaplar.forEach((cevap, i) => {
    if (i < toplam && cevap === quizSorulari[i].dogru) dogru++;
  });
  const yuzde = toplam === 0 ? 0 : Math.round((dogru / toplam) * 100);
  return { dogru, toplam, yuzde };
}