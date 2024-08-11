"use client";
import React, { useEffect, useRef, useState } from "react";

import BudgetTable from "../[id]/SingleTab";
import { latinToCyrillic } from "../tip/add/Components/lotin";
import { formatString, formatStringWithSpaces } from "../Utils";
const Documenttt = React.forwardRef(({ data, tasks, info }: any, ref: any) => {
  function formatNumber(value: number): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  return (
    <>
      <div ref={ref} className="   w-[100%]   text-justify">
        <div className="min-w-[100%] mx-auto mb-[3000000px]">
          <h1 className="text-[16px] font-bold mb-4 text-center">
            Оммавий тадбирни ўтказишда фуқаролар хавфсизлигини таъминлаш ва
            жамоат тартибини сақлаш тўғрисида намунавий шартнома
          </h1>
          <div className="mb-4 text-center">
            <p className="font-bold underline text-[16px]">
              {data.contractnumber + latinToCyrillic("-son")}
            </p>
          </div>
          <div className="mb-4 flex  justify-between">
            <p className="font-bold text-[16px]">{`${data.contractdate}`}</p>
            <p className="font-bold text-[14px]">{info && info?.ijrochi}</p>
          </div>
          <section className="mb-4">
            <p>
              <span className="font-bold">{data.clientname}</span> номидан
              _________ асосида фаолият юритувчи
              <span className="font-bold">______________________</span>{" "}
              келгусида «Буюртмачи» деб номланувчи бир томондан ва Ўзбекистон
              Республикаси Миллий гвардияси {info && info?.ijrochi} бўйича
              бошқармаси номидан шартнома асосида фаолият юритувчи Бошқарма
              бошлиғи {info && info?.boshliq} келгусида «Бажарувчи» деб
              номланувчи иккинчи томондан биргаликда эса томонлар ўртасида
              Ўзбекистон Республикаси Вазирлар Маҳкамасининг 2014 йил 29 июлдаги
              205-сон қарорига мувофиқ оммавий тадбирни ўтказишда фуқаролар
              хавфсизлигини таъминлаш ва жамоат тартибини сақлаш юзасидан
              шартнома тузилди.
            </p>
          </section>

          <section className="mb-5 text-[14px]">
            <h2 className="text-[14px] text-center font-semibold mb-0">
              1. Шартнома предмети
            </h2>
            <p className="mb-0">
              <span className="font-bold">1.1</span> «Буюртмачи»нинг топшириғига
              мувофиқ «Бажарувчи»
              <span className="font-bold">{data.timelimit}</span>гача
              <span className="font-bold">
                {" " + data.address + "да"}
              </span>{" "}
              бўлиб ўтадиган тадбирлар бўйича ўтказиладиган оммавий тадбир
              вақтида фуқаролар хавфсизлигини ва жамоат тартибини сақлаш бўйича
              мажбуриятни ўз зиммасига олади.
            </p>
          </section>

          <section className="mb-5 text-[14px]">
            <h2 className="text-[14px] text-center font-semibold mb-0">
              2. Ҳисоблашиш тартиблари ва хизмат нархлари
            </h2>
            <p className="mb-0">
              <span className="font-bold">2.1</span> «Буюртмачи» «Бажарувчи»нинг
              хизмат тўловларини ҳисоб рақамига пул ўтказиш ёки нақд тўлаш
              орқали амалга оширади ва тўлов ҳужжатлари нусхасини 3.3-бандда
              кўрсатилган муддатдан кечиктирмаган ҳолда тақдим этади.
            </p>
            <p className="mb-0">
              <span className="font-bold">2.2</span> Жамоат тартибини сақлаш
              борасидаги хизмат нархи Миллий гвардия Тошкент шаҳри бўйича
              бошқармаси томонидан тақдим этилган шартноманинг ажралмас қисми
              хисобланган смета харажатлари асосида жами миқдори
              <span className="font-bold ">
                {" " + formatNumber(+data.allmoney)} сўм
              </span>{" "}
              деб белгиланди.
            </p>
          </section>

          <section className="mb-5 text-[14px]">
            <h2 className="text-[14px] text-center font-semibold mb-0">
              3. Томонларнинг мажбуриятлари ва ҳуқуқлари
            </h2>
            <p className="mb-0">
              <span className="font-bold">3.1</span> «Бажарувчи» оммавий тадбир
              ўтказиш даврида жамоат тартибини сақлаш ҳуқуқбузарликларни ва
              бошқа қонун бузилиши ҳаракатларининг олдини олиш мажбуриятини
              олади.
            </p>
            <p className="mb-0">
              <span className="font-bold">3.2</span> «Бажарувчи» оммавий тадбир
              ўтказиш даврида томошабинларнинг сони ва тадбир ўтказилаётган
              ҳудуддаги тезкор вазиятга асосланган ҳолда ҳарбий хизматчилар ва
              ходимлар сонини камайтириш кўпайтириш ёки зарурият туғилганда
              оммавий тадбирни ўтказишни тўхтатишгача бўлган ҳуқуққа эга.
            </p>
            <p className="mb-0">
              <span className="font-bold">3.3</span> Шартнома имзолангач ___ кун
              ичида «Буюртмачи» тўловни 100% амалга ошириш мажбуриятини олади ва
              «Бажарувчи»дан жамоат тартибини сақлаш юзасидан ёзма мажбуриятини
              олиш ва ваколатли орган оммавий тадбирларни ўтказилишини назорат
              қилиш комиссиясига тақдим этиш учун тўлов ҳужжатлари нусхаларини
              тақдим этади.
            </p>
            <p className="mb-0">
              <span className="font-bold">3.4</span> «Бажарувчи» тўловнинг
              амалга оширилганлиги тўғрисидаги ҳужжат нусхаларини олгандан сўнг
              бир иш куни ичида «Буюртмачи»га _________ваколатли орган
              ҳузуридаги оммавий тадбирларнинг ўтказилишини назорат қилиш
              комиссиясига тақдим этиш учун жамоат тартибини сақлаш бўйича ёзма
              мажбуриятни тақдим этади.
            </p>
            <p className="mb-0 ">
              <span className="font-bold">3.5</span> «Буюртмачи» тадбир
              бошланишидан олдин уч календар куни ичида «Бажарувчи»га маълум
              қилган ҳолда тадбирни бекор қилиш ёки ўтказиш санасини ўзгартириш
              ҳуқуқига эга.
            </p>
            <p className="mb-0 ">
              <span className="font-bold">3.6</span> «Буюртмачи» объект
              маъмурияти билан ҳамкорликда Миллий гвардия ва ИИО ходимларига
              оммавий тадбир ўтадиган бинонинг маъмурий омборхона ва бошқа
              хоналарини текширувдан ўтказиш ҳамда жамоат тартибини сақлаш учун
              тақдим этиш мажбуриятини ўз зиммасига олади.
            </p>
            <p className="mb-0  ">
              <span className="font-bold">3.7</span> «Буюртмачи» томон
              шартноманинг 3.3-бандида кўрсатилган мажбуриятларни тўлиқ
              бажармаган тақдирда ваколатли орган оммавий тадбирларни
              ўтказилишини назорат қилиш комиссияси оммавий тадбирни ўтказишни
              тўхтатиш ҳуқуққа эга.
            </p>
            <p className="mb-0 ">
              <span className="font-bold">3.8</span> Вазирлар Маҳкамасининг 2014
              йил 29 июлдаги 205-сонли қарори асосида «Буюртмачи» «Бажарувчи»га
              тадбир бошланишидан олдин объектга эркин киришларини тасдиқловчи
              ҳужжатларни (чипталар таклифномалар ва бошқалар) Миллий гвардия ва
              ИИО (ходимлари ёки ҳарбий хизматчилари) зал ичида ўтиришлари учун
              ҳар бир тадбирга энг камида ______донадан тақдим этиш мажбуриятини
              ўз зиммасига олади.
            </p>
          </section>

          <section className="mb-5 text-[14px]">
            <h2 className="text-[14px] font-semibold text-center mb-0">
              4. Томонларнинг жавобгарлиги
            </h2>
            <p className="mb-0">
              <span className="font-bold">4.1</span> Ушбу шартномада белгиланган
              мажбуриятлар бажарилмаган тақдирда айбдор томон қонунчилик
              ҳужжатларига мувофиқ жавобгар ҳисобланади.
            </p>
            <p className="mb-0">
              <span className="font-bold">4.2</span> Ушбу шартнома ёки унга
              алоқадор масалалар бўйича баҳслар юзага келган тақдирда, томонлар
              ўзаро музокаралар орқали уларнинг ечимини топишнинг барча зарур
              чора-тадбирларини кўрадилар. Ушбу шартнома бўйича юзага келган
              барча баҳсларнинг ечими топилмаган тақдирда, ушбу баҳслар
              Ўзбекистон Республикасининг амалдаги қонунчиликда белгиланган суд
              тартибида ҳал қилинади.
            </p>
          </section>

          <section className="mb-5 text-[14px]">
            <h2 className="text-[14px] text-center font-semibold mb-0">
              5. Форс-мажор
            </h2>
            <p className="mb-0">
              <span className="font-bold">5.1</span> Томонлар мазкур шартнома
              бўйича форс-мажор ҳолатлари рўй берганда ўз мажбуриятларини қисман
              ёки бутунлай бажаришдан озод этиладилар.
            </p>
            <p className="mb-0">
              <span className="font-bold">5.2</span> Форс-мажор ҳолатларига
              олдини олиш мумкин бўлмаган ҳодисалар (ёнғин, тошқин, ер
              қимирлаши, фавқулодда ҳолатлар (вазиятлар) ва бошқа табиий
              офатлар), шунингдек, қонунчиликдаги ўзгаришлар киради.
            </p>
            <p className="mb-0">
              <span className="font-bold">5.3</span> Форс-мажор ҳолатлари рўй
              берганда “Томонлар” бу ҳақда бир-бирларини ёзма равишда хабардор
              этишлари шарт.
            </p>
          </section>

          <section className="mb-5 text-[14px]">
            <h2 className="text-[14px] text-center font-semibold mb-0">
              6. Коррупцияга қарши қўшимча шартлар
            </h2>
            <p className="mb-0">
              <span className="font-bold">6.1</span> Тарафларнинг шартнома
              тузишда, шартноманинг амал қилиш муддатида ва ушбу муддат
              тугагандан сўнг, шартнома билан боғлиқ коррупсиявий ҳаракатлар
              содир қилмасликка келишиб оладилар.
            </p>
            <p className="mb-0">
              <span className="font-bold">6.2</span> Тарафлар шартномадаги
              Коррупцияга қарши қўшимча шартларда белгиланган коррупсиянинг
              олдини олиш чораларини тан олади ва уларга риоя этилиши бўйича
              ҳамкорликни таъминлайдилар.
            </p>
            <p className="mb-0">
              <span className="font-bold">6.3</span> Ҳар бир тараф шартнома
              тузилган пайтда бевосита ўзи ёки унинг ижроия органлари, мансабдор
              шахслари ва ходимлари томонидан шартнома билан боғлиқ муносабатлар
              юзасидан қонунга хилоф равишда пул, мрддий қийматликлар
              берилмаганлигини, шартнома тузилиши эвазига норасмий пул ёки
              моддий қийматликлар олининшига йўл қўйилмаганлигини, таклиф
              этилмаганлигини, уларни беришга ваъда қилинмаганлигини
              кафолатлайди.
            </p>
            <p className="mb-0">
              <span className="font-bold">6.4</span> Коррупцияга оид
              ҳуқуқбузурлик содир қилиш учун таъмагирлик қилиш, ундаш, тазйиқ
              ўтказиш ёки таҳдид қилиш. Ушбу ҳолат бўйича бир тараф иккинчи
              тарафни ҳамда ваколатли давлат оргаларини дарҳол хабардор қилиши
              шарт.
            </p>
          </section>

          <section className="mb-5 text-[14px]">
            <h2 className="text-[14px] text-center font-semibold mb-0">
              7. Шартноманинг амал қилиш муддати ва шартномани бекор қилиш
              тартиблари
            </h2>
            <p className="mb-0 ">
              <span className="font-bold">7.1</span> Тарафларнинг юридик
              манзиллари, банк реквизитлари ўзгарган тақдирда, 2 кун ичида
              бир-бирларига ўзгарганлик ҳақида ёзма маълумот беришга
              мажбурдирлар.
            </p>
            <p className="mb-0 ">
              <span className="font-bold">7.2</span> Мазкур шартномага
              киритилган барча ўзгартириш ва қўшимчалар ёзма шаклда тузилиб,
              белгиланган тартибда тарафларнинг ваколатли вакиллари томонидан
              имзоланган тақдирдагина амалда бўлади.
            </p>
            <p className="mb-0 ">
              <span className="font-bold">7.3</span> Ўтказиладиган дастур
              вақтига, иштирокчилар ва меҳмонларнинг сонига ўзгартиришлар
              киритилган тақдирда, тадбир бошланишидан олдин қўшимча келишув
              шартномаси тузилиб, “Буюртмачи” қўшимча тўловни амалга оширишни ўз
              зиммасига олади.
            </p>
            <p className="mb-0 ">
              <span className="font-bold">7.4</span> Мазкур шартнома икки
              нусхада тузилиб, томонлар имзолаган кундан, бюджет ҳисобидан
              молиялаштириладиганлар учун шартнома ғазначилик бўлимлари
              томонидан рўйхатга олинган кундан кучга киради ва{" "}
              {data.validityperiod
                ? data.validityperiod + " "
                : "______йилнинг _______ "}{" "}
              кунигача амалда бўлади.
            </p>
            <p className="mb-0">
              <span className="font-bold">7.5</span> Шартнома муддатидан олдин
              томонларнинг ўзаро келишувига кўра ёки улардан бири томонидан
              шартнома шартларини бошқа томон жиддий равишда бузган тақдирда
              бекор қилиниши мумкин.
            </p>
          </section>

          <section className="text-[14px] ">
            <h2 className="text-[14px] text-center font-semibold mb-4">
              7. Томонларнинг реквизитлари
            </h2>
            <div className="flex  justify-between items-start">
              <div className="flex w-[50%] relative justify-center items-center flex-col">
                <h2 className="text-[14px] text-center font-bold mb-2">
                  Буюртмачи:
                </h2>
                <p className="font-bold text-[14px] mb-4 text-center">
                  {data.clientname}
                </p>
                {data.clientaddress && (
                  <div className="flex gap-1">
                    <div className="flex flex-col w-[250px]">
                      <span className="font-bold text-[14px] ">Манзил:</span>
                      <p className=" text-start  text-[14px]">{`${data.clientaddress}.  `}</p>
                      <span>
                        <span className="font-bold  ">Банк реквизитлари:</span>
                        <span className="ml-1">
                          Марказий банк Тошкент ш. ХККМ
                        </span>
                      </span>
                      {(data?.treasuryaccount27 || data?.treasuryaccount) && (
                        <>
                          <span className="font-bold">Ғазначилиги х/р: </span>
                          <span>
                            {formatStringWithSpaces(
                              data?.treasuryaccount27 || data?.treasuryaccount
                            )}
                          </span>
                        </>
                      )}

                      <span>
                        {" "}
                        <span className="font-bold">МФО: </span>{" "}
                        {data.clientmfo}.
                      </span>
                      <span>
                        {" "}
                        <span className="font-bold">х/р: </span>{" "}
                        {formatString(data.clientaccount)}
                      </span>
                      <span>
                        <span className="font-bold">СТИР:</span>{" "}
                        {formatStringWithSpaces(data?.clientstr)}.
                      </span>
                    </div>
                  </div>
                )}

                <div className=" absolute top-[350px] left-[40px]">
                  <div className="flex flex-col">
                    <h1 className="font-bold ">
                      Раҳбари: ________ ______________________
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex w-[50%] justify-center relative items-center flex-col">
                <h2 className="text-[14px] text-center font-bold mb-2">
                  Бажарувчи:
                </h2>
                <p className="font-bold text-[14px] mb-4 text-center">
                  ЎР Миллий гвардияси Тошкент шаҳри бўйича бошқармаси
                </p>
                <div className="flex gap-1">
                  <div className="flex flex-col  ">
                    <span className="max-w-[250px] flex flex-col gap-1 ">
                      <span className="font-bold text-[14px] ">Манзил:</span>
                      <span className=" text-[14px]">
                        {info && info?.manzil}
                      </span>
                    </span>
                    <span className="">
                      <span className="font-bold">Банк реквизитлари:</span>
                      <span className="ml-1"> {info && info?.bank}</span>
                    </span>
                    <span>
                      <span className="font-bold">МФО: </span>{" "}
                      {info && info?.mfo}
                    </span>
                    <span>
                      <span className="font-bold">х/р: </span>{" "}
                      {data?.accountnumber}
                    </span>
                    <span>
                      {" "}
                      <span className="font-bold">СТИР: </span>{" "}
                      {info && formatStringWithSpaces(info?.str)}
                    </span>
                  </div>
                </div>

                <div className=" absolute top-[350px] left-[40px]">
                  <div className="flex flex-col">
                    <h1 className="font-bold ">
                      Раҳбари: _________________
                      <span className="font-[400]">
                        {info && info?.boshliq}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="w-[100%] mx-auto">
          <BudgetTable
            address={data}
            data1={tasks}
            raq={data.contractnumber}
            dataId={data.id}
          />
        </div>
        <div className="w-[75%] pt-16 mx-auto flex justify-between">
          <div className="flex h-[150px] justify-between flex-col">
            <h2 className="text-[14px] text-center font-bold ">Бажарувчи:</h2>

            <span className="text-center font-bold">________________</span>
          </div>
          <div className="flex h-[150px] justify-between flex-col">
            <h2 className="text-[14px] text-center font-bold ">Буюртмачи:</h2>

            <span className="text-center font-bold">_______________</span>
          </div>
        </div>
      </div>
    </>
  );
});

export default Documenttt;
