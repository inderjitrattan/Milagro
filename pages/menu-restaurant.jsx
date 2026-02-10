import Layouts from "@/src/layouts/Layouts";

import dynamic from "next/dynamic";

const CoffeeMenu = dynamic(() => import("@/src/components/CoffeeMenu"), {
  ssr: false,
});

const MenuFlipbook = dynamic(() => import("@/src/components/FlipbookMenu"), {
  ssr: false,
});

const coffeeFlipbook = {
  title: "Kaffen Coffee Selection",
  subtitle: "Flip Through",
  imageOnly: true,
  showPageNumbers: false,
  cover: {
    image: "images/cover1.png",
    eyebrow: "Kaffen",
    title: "Coffee Menu",
    subtitle: "Crafted brews & sweet bites",
  },
  backCover: {
    image: "images/cover2.png",
    eyebrow: "See You Soon",
    title: "Stay Caffeinated",
    subtitle: "Thank you for visiting Kaffen",
  },
  pages: [
    {
      image: "images/menu1.png",
      title: "Espresso",
      description: "Rich, bold, and perfectly balanced",
    },
    {
      image: "images/menu2.png",
      title: "Barista Pouring Syrup",
      description: "Aromatic espresso with sweet notes",
    },
    {
      image: "images/menu3.png",
      title: "Late",
      description: "Silky steamed milk over espresso",
    },
    {
      image: "images/menu4.png",
      title: "Cappuccino Arabica",
      description: "Foamy, smooth, and comforting",
    },
    {
      image: "images/menu2.png",
      title: "Italian Burger",
      description: "Savory bite for a hearty pairing",
    },
    {
      image: "images/menu3.png",
      title: "Chicken Burger",
      description: "Classic favorite with a spicy kick",
    },
  ],
};

const MenuCoffee = () => {
  return (
    <Layouts>
      <MenuFlipbook {...coffeeFlipbook} />
    </Layouts>
  );
};
export default MenuCoffee;
