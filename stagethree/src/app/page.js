"use client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import ImageList from "../components/ImageList";
import update from "immutability-helper";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { BsSearch } from "react-icons/bs";

const image = [
  {
    id: "abcd123",
    src: "/images/1.jpg",
    tag: "food",
  },
  {
    id: "zxy123456",
    src: "/images/2.jpg",
    tag: "nature",
  },
  {
    id: "8xy12chj6",
    src: "/images/3.jpg",
    tag: "nature",
  },
  {
    id: "uxy456",
    src: "/images/4.jpg",
    tag: "model",
  },
  {
    id: "asdf123",
    src: "/images/5.jpg",
    tag: "nature",
  },
  {
    id: "qwe098",
    src: "/images/6.jpg",
    tag: "pet",
  },
  {
    id: "pie367",
    src: "/images/7.jpg",
    tag: "football",
  },
  {
    id: "plm353",
    src: "/images/8.jpg",
    tag: "car",
  },
  {
    id: "129urt",
    src: "/images/9.jpg",
    tag: "football",
  },
  {
    id: "pq0192",
    src: "/images/10.jpg",
    tag: "car",
  },
  {
    id: "btf493",
    src: "/images/11.jpg",
    tag: "football",
  },
  {
    id: "ghj543",
    src: "/images/12.jpg",
    tag: "pet",
  },
  {
    id: "p1o2i3",
    src: "/images/13.jpg",
    tag: "food",
  },
  {
    id: "p0p0p0",
    src: "/images/14.jpg",
    tag: "food",
  },
  {
    id: "h8h8h8",
    src: "/images/15.jpg",
    tag: "food",
  },
  {
    id: "n7n3g3",
    src: "/images/16.jpg",
    tag: "pet",
  },
];

export default function Home() {
  const [user, setUser] = useState({});
  const [images, setImages] = useState(image);
  const [search, setSearch] = useState("");
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    setUser(session?.data?.user);
  }, [session.status]);

  useEffect(() => {
    console.log(search);
    if (search.length >= 1)
      return setImages(
        image.filter((item) => item.tag.includes(search.toLowerCase()))
      );
    else setImages(image);
  }, [search]);

  const isTouchDevice = () => {
    if ("ontouchstart" in window) {
      return true;
    }
    return false;
  };

  const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    console.log(draggedImage);

    setImages(
      update(images, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };
  if (session.status === "loading") return <Loading />;
  else if (session.status === "authenticated" || "unauthenticated")
    return (
      <main className="flex h-screen flex-col items-center  p-4 md:p-10 gap-6 lg:gap-10 bg-gradient-to-r from-blue-200 via-rose-200 to-sky-500 ">
        <div className=" flex justify-between lg:block w-full relative">
          <h1 className="text-left font-bold text-2xl md:text-4xl ">
            HNG Image Gallery
          </h1>
          <nav className="flex lg:absolute top-2 right-5 items-center">
            {user ? (
              <button
                className="px-3 py-2 rounded-lg bg-rose-700 text-sm lg:text-base"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            ) : (
              <div className="flex gap-4">
                <button
                  className="text-sm md:text-base px-3 py-2 rounded-lg bg-white text-rose-700"
                  onClick={() => router.push("login")}
                >
                  Login
                </button>
                <button
                  className="text-sm md:text-base px-3 py-2 rounded-lg bg-rose-700"
                  onClick={() => router.push("signup")}
                >
                  Signup
                </button>
              </div>
            )}
          </nav>
        </div>
        {user && (
          <h1 className="text-center px-3 text-base text-rose-700 shadow-sm">
            Welcome, {user?.email}
          </h1>
        )}
        <div className="w-full md:max-w-[500px] flex justify-center items-center gap-2 bg-white p-2 px-4 rounded-lg">
          <input
            placeholder="search by tag e.g food, nature, football, car"
            className="flex-1 outline-none rounded-lg bg-transparent text-rose-700 h-[46px]"
            type="search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <BsSearch color="black" size={25} className="cursor-pointer" />
        </div>
        <DndProvider backend={backendForDND}>
          <ImageList images={images} moveImage={moveImage} />
        </DndProvider>
      </main>
    );
}
