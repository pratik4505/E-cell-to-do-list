import React from "react";

function Description(props) {
  const { title, createDate, dueDate, description, isCompleted } = props.data;

  return (
    <article
      className={`shadow-sm flex h-auto  items-end flex-col rounded-2xl ${
        props.border ? "lg:bg-indigo-100" : "lg:bg-indigo-100 rounded-tl-none"
      }`}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a35d27fb2a76d86f547c1a07b5ba0b456b5f428d282180916631d8d8e1433e93?apiKey=e78b8ebeb1ca411684763bd08d1fd4c3&"
        className={`aspect-[1.09] object-contain object-center w-6 overflow-hidden max-w-full mr-4 ${
          props.border ? "hidden" : ""
        }`}
        alt="Task Logo"
        onClick={() => props.closeDialog()}
      />
      <div className=" flex w-full flex-col p-4 overflow-y-scroll">
        <header className="text-black text-3xl font-bold self-stretch whitespace-nowrap">
          {title}
        </header>
        <section className="text-black text-xl font-semibold self-stretch mt-7">
          {description}
        </section>
        <small className="text-red-700 text-sm font-semibold self-stretch whitespace-nowrap mt-2.5">
          Due: {dueDate}
        </small>
        <section className="text-black text-lg self-stretch mt-4">
          {description}
        </section>
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/51638a4c2bbbd87aedd918985a7fea349606965bd6620891cbb1883d789c80be?apiKey=e78b8ebeb1ca411684763bd08d1fd4c3&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/51638a4c2bbbd87aedd918985a7fea349606965bd6620891cbb1883d789c80be?apiKey=e78b8ebeb1ca411684763bd08d1fd4c3&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/51638a4c2bbbd87aedd918985a7fea349606965bd6620891cbb1883d789c80be?apiKey=e78b8ebeb1ca411684763bd08d1fd4c3&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/51638a4c2bbbd87aedd918985a7fea349606965bd6620891cbb1883d789c80be?apiKey=e78b8ebeb1ca411684763bd08d1fd4c3&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/51638a4c2bbbd87aedd918985a7fea349606965bd6620891cbb1883d789c80be?apiKey=e78b8ebeb1ca411684763bd08d1fd4c3&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/51638a4c2bbbd87aedd918985a7fea349606965bd6620891cbb1883d789c80be?apiKey=e78b8ebeb1ca411684763bd08d1fd4c3&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/51638a4c2bbbd87aedd918985a7fea349606965bd6620891cbb1883d789c80be?apiKey=e78b8ebeb1ca411684763bd08d1fd4c3&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/51638a4c2bbbd87aedd918985a7fea349606965bd6620891cbb1883d789c80be?apiKey=e78b8ebeb1ca411684763bd08d1fd4c3&"
          className="aspect-[1.06] object-contain object-center w-full overflow-hidden self-center max-w-[283px] mt-7"
          alt="Task Image"
        />
      </div>
    </article>
  );
}

export default Description;
