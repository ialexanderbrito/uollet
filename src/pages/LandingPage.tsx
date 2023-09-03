import { useState } from 'react';

import {
  ChartBar,
  DeviceMobile,
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  List,
  X,
} from '@phosphor-icons/react';
import controlFinanceImg2 from 'assets/control_finance_2.svg';
import controlFinanceImg3 from 'assets/control_finance_3.svg';
import controlFinanceImg4 from 'assets/control_finance_4.svg';
import controlFinanceImg from 'assets/control_finance.svg';
import logoImg from 'assets/favicon.svg';
import illustrationGif from 'assets/finance.svg';
import mockUpCellImg from 'assets/mockup_cell.png';
import mockUpImg from 'assets/mockup.png';

export function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const Links = [
    { name: 'Sobre nós', link: '#dashboard' },
    { name: 'Recursos', link: '#feautures' },
    { name: 'Contatos', link: '#footer' },
  ];

  return (
    <div className="h-[85vh] bg-primary">
      <header className="fixed left-0 top-0 w-full">
        <div className="items-center justify-between bg-primary px-7 py-4 md:flex md:px-10">
          <div
            className="flex cursor-pointer items-center font-[Poppins] text-2xl font-bold
      text-gray-800"
          >
            <img src={logoImg} alt="Icone" className="h-8" />
          </div>

          <div
            onClick={() => toggleMenu()}
            className="absolute right-8 top-6 cursor-pointer text-3xl text-white md:hidden"
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </div>

          <ul
            className={`absolute left-0 z-[-1] w-full bg-primary pb-12 pl-9 transition-all duration-500 ease-in md:static md:z-auto md:flex md:w-auto md:items-center md:pb-0 md:pl-0 ${
              isOpen ? 'top-16 ' : 'top-[-490px]'
            }`}
          >
            {Links.map((link) => (
              <li key={link.name} className="my-7 text-xl md:my-0 md:ml-8">
                <a href={link.link} className="text-white duration-500">
                  {link.name}
                </a>
              </li>
            ))}

            <div className="md-0 flex  gap-2  md:ml-6 md:gap-6">
              <a
                href="https://app.finance-oficial.netlify.app/"
                className="text-white"
              >
                <button className="h-12 rounded border-0 bg-secondary pb-0 pl-8 pr-8 pt-0 text-base text-white filter hover:bg-secondaryDark hover:transition-all">
                  Entrar
                </button>
              </a>
              <a
                href="https://app.finance-oficial.netlify.app/"
                className="text-white"
              >
                <button className="h-12 rounded border-0 bg-secondary pb-0 pl-8 pr-8 pt-0 text-base text-white filter hover:bg-secondaryDark hover:transition-all">
                  Cadastrar
                </button>
              </a>
            </div>
          </ul>
        </div>
      </header>

      <main className="m-0-auto-8 mb-10 flex w-full max-w-7xl flex-wrap items-center justify-between pb-0 pl-4 pr-4 pt-0 sm:mb-48 sm:pt-28">
        <div className="mt-20 w-full md:w-2/4">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Simplifique o seu controle{' '}
            <span className="text-secondary">financeiro</span>
          </h1>

          <p className="mb-8 ml-0 mr-0 mt-4 text-base text-white">
            A maneira mais rápida, fácil e simples de controlar seus gastos
            financeiros e ver métricas claras sobre seus dados.
          </p>

          <div className="flex flex-col items-center justify-around gap-4 md:flex-row">
            <button className="mb-2 flex h-12 items-center justify-between gap-1 rounded border-0 bg-primaryDark p-4 text-base text-white hover:bg-primaryDark/60 hover:transition-all md:mb-0 md:p-8">
              <DeviceMobile size={18} weight="fill" />
              Dados exibidos em gráficos
            </button>
            <button className="flex h-12 items-center justify-between gap-1 rounded border-0 bg-primaryDark p-4 text-base text-white hover:bg-primaryDark/60 hover:transition-all md:p-8">
              <ChartBar size={18} weight="fill" />
              Utilize em qualquer lugar
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:w-2/4">
          <img
            src={illustrationGif}
            alt="Ilustração"
            className="mt-4 w-full max-w-md md:mt-0"
          />
        </div>
      </main>

      <div id="dashboard">
        <section className="m-2-auto mt-16 flex w-full max-w-7xl flex-col items-center justify-between gap-8 pb-0 pl-4 pr-4 pt-0 md:mt-48 md:flex-row">
          <div className="w-full md:w-1/2">
            <img src={mockUpImg} alt="" className="w-full" />
          </div>

          <div className="w-full md:w-1/2">
            <span className="mb-2 block rounded bg-orange-200 pb-1 pl-4 pr-4 pt-1 font-semibold">
              01.
            </span>
            <h1 className="text-3xl font-bold text-secondary md:text-4xl lg:text-5xl">
              Dashboard
            </h1>
            <p className="mb-4 ml-0 mr-0 mt-2 text-base tracking-widest md:mb-8 md:text-lg lg:text-base">
              Adicione, edite, exclua e veja todas as suas transações no
              dashboard da sua conta.
            </p>

            <div className="flex flex-col items-center gap-4 md:flex-row">
              <button className="flex h-10 w-72 items-center justify-between gap-1 rounded border-0 bg-secondary p-2 text-base text-white transition-all hover:bg-secondaryDark md:h-12 md:p-4 md:text-lg">
                Acessar
              </button>
              <button className="mt-2 flex h-10 w-72 items-center justify-between gap-1 rounded border border-secondary bg-transparent p-2 text-base text-secondary transition-all hover:bg-secondaryDark hover:text-white md:mt-0 md:h-12 md:p-4 md:text-lg">
                Saiba mais
              </button>
            </div>
          </div>
        </section>
      </div>

      <div id="mobile">
        <section className="m-2-auto mt-16 flex w-full max-w-7xl flex-col items-center justify-between gap-8 pb-0 pl-4 pr-4 pt-0 md:mt-36 md:flex-row">
          <div className="w-full md:w-1/2">
            <span className="mb-2 block rounded bg-orange-200 pb-1 pl-4 pr-4 pt-1 font-semibold">
              02.
            </span>
            <h1 className="text-3xl font-bold text-secondary md:text-4xl lg:text-5xl">
              Mobile
            </h1>
            <p className="mb-4 ml-0 mr-0 mt-2 text-base tracking-widest md:mb-8 md:text-lg lg:text-base">
              Controle seus gastos em qualquer lugar, com qualquer dispositivo.
            </p>

            <div className="flex flex-col items-center gap-4 md:flex-row">
              <button className="flex h-10 w-72 items-center justify-between gap-1 rounded border-0 bg-secondary p-2 text-base text-white transition-all hover:bg-secondaryDark md:h-12 md:p-4 md:text-lg">
                Acessar
              </button>
              <button className="mt-2 flex h-10 w-72 items-center justify-between gap-1 rounded border border-secondary bg-transparent p-2 text-base text-secondary transition-all hover:bg-secondaryDark hover:text-white md:mt-0 md:h-12 md:p-4 md:text-lg">
                Saiba mais
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <img src={mockUpCellImg} alt="" className="w-full" />
          </div>
        </section>
      </div>

      <div id="feautures">
        <section className="flex h-fit items-center justify-center bg-primary pb-8 pl-4 pr-4 pt-16 sm:pt-16 md:pt-24 lg:pt-32">
          <div className="m-0-auto flex w-full max-w-7xl flex-col flex-wrap items-center justify-around">
            <div>
              <h1 className="text-center text-3xl font-semibold text-white sm:text-4xl md:text-4xl lg:text-5xl">
                Utilize recursos{' '}
                <span className="text-secondary">gratuitos.</span>
              </h1>
              <p className="mb-4 ml-0 mr-0 mt-4 text-center text-base text-white sm:text-lg md:mb-8">
                Entenda como funciona a nossa plataforma e veja os recursos
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <div className="w-full rounded bg-primaryDark sm:w-1/2 md:w-1/2 lg:w-4/12">
                <img
                  src={controlFinanceImg}
                  alt=""
                  className="m-0-auto block w-[65%]"
                />
                <h3 className="mb-4 text-center text-lg font-bold text-secondary sm:text-xl">
                  Planejador de orçamentos
                </h3>
                <p className="mb-4 text-center text-sm text-white sm:text-base">
                  Diga adeus às planilhas complexas. Adicione seus gastos e veja
                  o quanto você pode gastar por dia, semana, mês ou ano.
                </p>
              </div>
              <div className="w-full rounded bg-primaryDark sm:w-1/2 md:w-1/2 lg:w-4/12">
                <img
                  src={controlFinanceImg2}
                  alt=""
                  className="m-0-auto block w-[65%]"
                />
                <h3 className="mb-4 text-center text-lg font-bold text-secondary sm:text-xl">
                  Planejador de orçamentos
                </h3>
                <p className="mb-4 text-center text-sm text-white sm:text-base">
                  Diga adeus às planilhas complexas. Adicione seus gastos e veja
                  o quanto você pode gastar por dia, semana, mês ou ano.
                </p>
              </div>
              <div className="w-full rounded bg-primaryDark sm:w-1/2 md:w-1/2 lg:w-4/12">
                <img
                  src={controlFinanceImg3}
                  alt=""
                  className="m-0-auto block w-[65%]"
                />
                <h3 className="mb-4 text-center text-lg font-bold text-secondary sm:text-xl">
                  Planejador de orçamentos
                </h3>
                <p className="mb-4 text-center text-sm text-white sm:text-base">
                  Diga adeus às planilhas complexas. Adicione seus gastos e veja
                  o quanto você pode gastar por dia, semana, mês ou ano.
                </p>
              </div>
              <div className="w-full rounded bg-primaryDark sm:w-1/2 md:w-1/2 lg:w-4/12">
                <img
                  src={controlFinanceImg4}
                  alt=""
                  className="m-0-auto block w-[65%]"
                />
                <h3 className="mb-4 text-center text-lg font-bold text-secondary sm:text-xl">
                  Planejador de orçamentos
                </h3>
                <p className="mb-4 text-center text-sm text-white sm:text-base">
                  Diga adeus às planilhas complexas. Adicione seus gastos e veja
                  o quanto você pode gastar por dia, semana, mês ou ano.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="depoiments">
        <section className="m-0-auto flex h-[90vh] max-w-7xl flex-col flex-wrap items-center justify-center p-4">
          <h1 className="mb-8 text-center text-6xl font-bold text-primary">
            Junte-se a nós!
            <br />
            faça parte do
            <br />
            <span className="text-secondary">Finance</span>
          </h1>

          <button
            className="h-12 rounded border-0 bg-secondary pb-0 pl-8 pr-8 pt-0 text-base text-white filter"
            type="button"
          >
            Começe agora
          </button>
        </section>
      </div>

      <section
        id="footer"
        className="flex flex-col items-center justify-between gap-6 bg-primaryDark p-4 text-white md:flex-row"
      >
        <p className="text-center md:text-left">
          Conecte-se conosco nas redes sociais
        </p>
        <ul className="flex flex-row gap-10">
          <li>
            <a
              href="https://www.instagram.com/ialexanderbrito/"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramLogo size={24} weight="duotone" />
            </a>
          </li>
          <li>
            <a
              href="https://ww.github.com/ialexanderbrito"
              target="_blank"
              rel="noreferrer"
            >
              <GithubLogo size={24} weight="duotone" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/ialexanderbrito/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedinLogo size={24} weight="duotone" />
            </a>
          </li>
        </ul>
      </section>

      <footer className="grid grid-cols-1 gap-8 bg-primary p-4 text-white md:grid-cols-2 md:p-10 lg:grid-cols-4">
        <div>
          <h3 className="relative mb-4 text-2xl after:absolute after:bottom-0 after:left-0 after:h-1 after:w-1/2 after:rounded after:bg-secondary">
            Finance
          </h3>
          <p className="text-justify text-base md:w-3/4 lg:w-full">
            A maneira mais rápida, fácil e simples de controlar seus gastos
            financeiros e ver métricas claras sobre seus dados
          </p>
        </div>

        <div>
          <h3 className="relative mb-4 text-2xl after:absolute after:bottom-0 after:left-0 after:h-1 after:w-1/2 after:rounded after:bg-secondary">
            Links úteis
          </h3>
          <ul className="text-base">
            <li className="mb-2">
              <a href="#dashboard">Dashboard</a>
            </li>
            <li className="mb-2">
              <a href="#mobile">Mobile</a>
            </li>
            <li className="mb-2">
              <a href="#feautures">Recursos</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="relative mb-4 text-2xl after:absolute after:bottom-0 after:left-0 after:h-1 after:w-1/2 after:rounded after:bg-secondary">
            Contato
          </h3>
          <ul className="text-base">
            <li className="mb-2">
              <a
                href="mailto:
                eu@ialexanderbrito.dev
              "
              >
                eu@ialexanderbrito.dev
              </a>
            </li>
            <li className="mb-2">
              <a href="tel:+5581999999999">+55 (81) 99999-9999</a>
            </li>
            <li className="mb-2">
              <a href="https://www.ialexanderbrito.dev">ialexanderbrito.dev</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
