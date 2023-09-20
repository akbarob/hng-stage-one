"use client";
import React, { useRef } from "react";
import Image from "next/image";
// import useDrag and useDrop hooks from react-dnd
import { useDrag, useDrop } from "react-dnd";
import { blured } from "@/utils/bluredData";

// Need to pass which type element can be draggable, its a simple string or Symbol. This is like an Unique ID so that the library know what type of element is dragged or dropped on.

const imgblur = blured;
const ImageMove = ({ image, index, moveImage, user }) => {
  const type = "Image";
  const ref = useRef(null); // Initialize the reference

  // useDrop hook is responsible for handling whether any item gets hovered or dropped on the element
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: type,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    hover(item) {
      // item is the dragged element
      if (!ref.current) {
        return;
      }
      const dragIndex = user && item.index;
      // current element where the dragged element is hovered on
      const hoverIndex = user && index;
      // If the dragged element is hovered in the same place, then do nothing
      if (dragIndex === hoverIndex) {
        return;
      }
      // If it is dragged around other elements, then move the image and set the state with position changes
      moveImage(dragIndex, hoverIndex);
      /*
          Update the index for dragged item directly to avoid flickering
          when the image was half dragged into the next
        */
      item.index = hoverIndex;
    },
  });

  // useDrag will be responsible for making an element draggable. It also expose, isDragging method to add any styles while dragging
  const [{ isDragging }, drag] = useDrag(() => ({
    // what type of item this to determine if a drop target accepts it
    type: type,
    // data of the item to be available to the drop methods
    item: { id: image.id, index },
    // method to collect additional data for drop handling like whether is currently being dragged
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  /* 
    Initialize drag and drop into the element using its reference.
    Here we initialize both drag and drop on the same element (i.e., Image component)
  */
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: user && "move" }}
      className={`relative w-[100px] h-[100px]  md:w-[150px] md:h-[150px]  lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px]  ${
        isDragging && "rounded-[20px] border"
      }`}
    >
      <Image
        ref={drag}
        alt={`img - ${image.id}`}
        src={image.src}
        className={` ${
          isDragging && "rounded-full"
        } rounded-xl object-cover  hover:border-4 hover:border-rose-700 `}
        fill
        sizes="75vw"
        placeholder="blur"
        blurDataURL={imgblur}
      />
    </div>
  );
};

export default function ImageList({ images, moveImage, user }) {
  const renderImage = (image, index) => {
    return image ? (
      <ImageMove
        image={image}
        index={index}
        key={`${image.id}-image`}
        moveImage={moveImage}
        user={user}
      />
    ) : null;
  };
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-5 bg-black/10 p-8 rounded-lg">
      {images.map(renderImage)}
    </section>
  );
}
