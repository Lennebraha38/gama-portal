import type { Metadata } from "next";
import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";
import { Reveal } from "@/components/Reveal";
import { RozetVitrini } from "@/components/RozetVitrini";

export const metadata: Metadata = {
  title: "Açık Kaynak Katkı Rehberi",
  description:
    "Gama'ya ve açık kaynak projelere nasıl katkı verilir: git temelleri, fork, pull request ve katkı rozetleri.",
};

const adimlar = [
  {
    ad: "Git'i kur",
    aciklama:
      "git-scm.com üzerinden Git'i kur. İlk ayarda kullanıcı adını ve e-postanı tanımla: git config --global user.name \"Adın\" ve user.email.",
  },
  {
    ad: "Bir issue bul",
    aciklama:
      "Projelerin 'issues' sekmesinde 'good first issue' etiketli görevler yeni başlayanlar için biçilmiş kaftandır. Görevi üstlendiğini yorum olarak belirt.",
  },
  {
    ad: "Projeyi fork et",
    aciklama:
      "GitHub'da proje sayfasındaki 'Fork' butonuyla projenin kendi kopyanı oluştur. Sonra kopyanı bilgisayarına klonla: git clone <adres>.",
  },
  {
    ad: "Branch aç",
    aciklama:
      "Değişikliklerini ana dalda değil, göreve özel bir dalda yap: git checkout -b gorev/etkinlik-takvimi. Böylece birden çok görev birbirine karışmaz.",
  },
  {
    ad: "Küçük ve anlaşılır değiştir",
    aciklama:
      "Tek bir issue için tek bir değişiklik yap. Commit mesajın ne yaptığını net anlatsın; örneğin 'etkinlik takvimine ay görünümü eklendi'.",
  },
  {
    ad: "Pull request aç",
    aciklama:
      "Değişikliğini fork'undan asıl projeye gönder: 'New pull request'. Açıklamada hangi issue'yu çözdüğünü ve nasıl test ettiğini yaz.",
  },
  {
    ad: "Geri bildirimi bekle",
    aciklama:
      "Bakımcılar yorum yapabilir, düzeltme isteyebilir. İlk PR'ında soru sormaktan çekinme; açık kaynak bir öğrenme alanıdır.",
  },
];

export default function KaynakPage() {
  return (
    <PageTransition>
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-16">
        <Reveal>
          <p className="sys-label">
            Sistem 08 <span className="text-zinc-400">/</span> Gama
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Açık Kaynak Katkı Rehberi
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-300">
            Gama, teknolojinin açık kaynak ruhuyla büyüyeceğine inanır.
            Burada, ilk katkından itibaren bir açık kaynak projesine nasıl
            katkı vereceğini adım adım anlatıyoruz.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 grid gap-4">
            {adimlar.map((a, i) => (
              <div
                key={a.ad}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gama-500/15 font-mono text-sm font-bold text-gama-300 ring-1 ring-gama-400/30">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">{a.ad}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-300">{a.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-gama-500/20 bg-gama-500/[0.06] p-6 backdrop-blur">
            <p className="font-semibold text-white">Nereden başlarım?</p>
            <p className="mt-1.5 text-sm leading-6 text-zinc-300">
              Topluluğumuzun dijital altyapısı açık kaynak yaklaşımıyla
              geliştirilir. Yazılıma, tasarıma ya da içeriğe katkı vermek
              istersen{" "}
              <Link href="/katil" className="text-gama-300 underline-offset-4 hover:underline">
                katılım formundan
              </Link>{" "}
              başvurabilirsin. GitHub kullanımına hakim olduktan sonra ilk
              issue&apos;nu seçmek için{" "}
              <Link href="/projeler" className="text-gama-300 underline-offset-4 hover:underline">
                proje sayfamıza
              </Link>{" "}
              göz at.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-12">
            <p className="sys-label">
              Katkı Rozetleri <span className="text-zinc-400">/</span> Vitrin
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              Kazandığın rozetler
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
              Üyelik, günlük görev serileri, quiz, challenge ve proje
              başvuruları rozet kazandırır. Rozetler bu tarayıcıda birikir;
              hesabınla{" "}
              <Link href="/uye" className="text-gama-300 underline-offset-4 hover:underline">
                üye girişi
              </Link>{" "}
              yaptığında üyelik rozetin otomatik görünür.
            </p>
            <div className="mt-6">
              <RozetVitrini />
            </div>
          </div>
        </Reveal>
      </div>
    </PageTransition>
  );
}