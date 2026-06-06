import { StaticImageData } from "next/image";
import WuXianImg from "@/assets/team_avatar/5X.webp";
import ChunHsuImg from "@/assets/team_avatar/Chun-Hsu.webp";
import ChunLinImg from "@/assets/team_avatar/Chun-Lin.webp";
import HanXuanImg from "@/assets/team_avatar/HanXuan.webp";
import JennyImg from "@/assets/team_avatar/Jenny.webp";
import ShuHsiImg from "@/assets/team_avatar/ShuHsi.webp";
import WeiSyuanImg from "@/assets/team_avatar/WeiSyuan.webp";
import YungYuImg from "@/assets/team_avatar/YungYu.webp";
import ChesterImg from "@/assets/team_avatar/chester.webp";
import JieYinImg from "@/assets/team_avatar/gene.webp";
import JunLiImg from "@/assets/team_avatar/junli.webp";
import KuanHsienImg from "@/assets/team_avatar/kuanhsien.webp";
import LiHungImg from "@/assets/team_avatar/lihung.webp";
import SteveImg from "@/assets/team_avatar/stevechan.webp";
import TingYuImg from "@/assets/team_avatar/TingYu.webp";
import YuFangImg from "@/assets/team_avatar/yufang.webp";
import BoJunImg from "@/assets/team_avatar/BoJun.webp";

type TeamType = {
  title: string;
  members: MemberProps[];
};

type MemberProps = {
  name: string;
  email?: string;
  image?: StaticImageData;
};

const teams: TeamType[] = [
  {
    title: "Core",
    members: [
      { name: "Kuan-Hsien", image: KuanHsienImg },
    ],
  },
  {
    title: "Finance & Venue",
    members: [
      { name: "Bo-Jun", image: BoJunImg },
      { name: "Li-Hung", image: LiHungImg },
      { name: "Yung-Yu", image: YungYuImg },
      { name: "Chun-Hsu", image: ChunHsuImg },
    ],
  },
  {
    title: "Website",
    members: [
      { name: "Chester", image: ChesterImg },
      { name: "Wu-Xian", image: WuXianImg },
      { name: "Steve", image: SteveImg },
    ],
  },
  {
    title: "Program",
    members: [
      { name: "Terry" },
      { name: "Ming-Jie" },
      { name: "Jun-Li", image: JunLiImg },
      { name: "Shu-Hsi", image: ShuHsiImg },
    ],
  },
  {
    title: "Promotion",
    members: [
      { name: "Chun-Lin", image: ChunLinImg },
      { name: "Jun-Li", image: JunLiImg },
      { name: "Jenny", image: JennyImg },
      { name: "Ting-Yu", image: TingYuImg },
      { name: "Jie-Yin", image: JieYinImg },
    ],
  },
  {
    title: "Venue (Logistics)",
    members: [
      { name: "Yu-Fang", image: YuFangImg },
      { name: "Li-Hung", image: LiHungImg },
      { name: "Terry" },
      { name: "Bo-Jun", image: BoJunImg },
      { name: "Han-Xuan", image: HanXuanImg },
      { name: "Wei-Syuan", image: WeiSyuanImg },
    ],
  },
];

export default teams;
