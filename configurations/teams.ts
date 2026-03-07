import { StaticImageData } from "next/image";
import WuXianImg from "@/assets/swconf25_team_avatar/5X.png";
import ChunHsuImg from "@/assets/swconf25_team_avatar/Chun-Hsu.jpg";
import ChunLinImg from "@/assets/swconf25_team_avatar/Chun-Lin.jpg";
import ChunShihImg from "@/assets/swconf25_team_avatar/ChunShih.png";
import HanXuanImg from "@/assets/swconf25_team_avatar/HanXuan.jpg";
import JennyImg from "@/assets/swconf25_team_avatar/Jenny.jpg";
import PeterWolfImg from "@/assets/swconf25_team_avatar/PeterWolf.png";
import RobertImg from "@/assets/swconf25_team_avatar/Robert.png";
import ShihEnImg from "@/assets/swconf25_team_avatar/ShihEn.png";
import ShuHsiImg from "@/assets/swconf25_team_avatar/ShuHsi.png";
import WeiSyuanImg from "@/assets/swconf25_team_avatar/WeiSyuan.jpeg";
import YungYuImg from "@/assets/swconf25_team_avatar/YungYu.jpeg";
import ZongHanImg from "@/assets/swconf25_team_avatar/Zonghan.jpg";
import ChesterImg from "@/assets/swconf25_team_avatar/chester.jpg";
import DboyImg from "@/assets/swconf25_team_avatar/dboy.jpg";
import JieYinImg from "@/assets/swconf25_team_avatar/gene.png";
import JunLiImg from "@/assets/swconf25_team_avatar/junli.jpg";
import KuanHsienImg from "@/assets/swconf25_team_avatar/kuanhsien.jpeg";
import LiHungImg from "@/assets/swconf25_team_avatar/lihung.jpg";
import MaiImg from "@/assets/swconf25_team_avatar/mai.jpeg";
import SteveImg from "@/assets/swconf25_team_avatar/stevechan.png";
import VeraImg from "@/assets/swconf25_team_avatar/vera.jpeg";
import YuFangImg from "@/assets/swconf25_team_avatar/yufang.jpg";

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
      { name: "Chun-Hsu", image: ChunHsuImg },
      { name: "Kuan-Hsien", image: KuanHsienImg },
      { name: "Yung-Yu", image: YungYuImg },
    ],
  },
  {
    title: "Finance & Venue",
    members: [
      { name: "Chun-Hsu", image: ChunHsuImg },
      { name: "Li-Hung", image: LiHungImg },
      { name: "Vera", image: VeraImg },
      { name: "Yung-Yu", image: YungYuImg },
      { name: "Robert", image: RobertImg },
    ],
  },
  {
    title: "Website",
    members: [
      { name: "Chester", image: ChesterImg },
      { name: "Wu-Xian", image: WuXianImg },
      { name: "Steve", image: SteveImg },
      { name: "Jie-Yin", image: JieYinImg },
      { name: "Chun-Lin", image: ChunLinImg },
    ],
  },
  {
    title: "Registration",
    members: [{ name: "Jie-Yin", image: JieYinImg }],
  },
  {
    title: "Program",
    members: [
      { name: "Chun-Shih", image: ChunShihImg },
      { name: "Han-Xuan", image: HanXuanImg },
      { name: "Po-Chi" },
      { name: "Shu-Hsi", image: ShuHsiImg },
    ],
  },
  {
    title: "Reviewer",
    members: [
      { name: "Yung-Yu", image: YungYuImg },
      { name: "Shu-Hsi", image: ShuHsiImg },
      { name: "Zhong-Han", image: ZongHanImg },
      { name: "Peter", image: PeterWolfImg },
      { name: "Chester", image: ChesterImg },
      { name: "Steve", image: SteveImg },
      { name: "En Shih", image: ShihEnImg },
      { name: "Chun-Hsu", image: ChunHsuImg },
      { name: "Dboy", image: DboyImg },
      { name: "Terry" },
      { name: "Chun-Shih", image: ChunShihImg },
      { name: "Kuan-Hsien", image: KuanHsienImg },
      { name: "Jie-Yin", image: JieYinImg },
    ],
  },
  {
    title: "Promotion",
    members: [
      { name: "Chun-Lin", image: ChunLinImg },
      { name: "Jenny", image: JennyImg },
      { name: "Zhong-Han", image: ZongHanImg },
      { name: "Mai Mai", image: MaiImg },
      { name: "Jie-Yin", image: JieYinImg },
    ],
  },
  {
    title: "Venue (Logistics)",
    members: [
      { name: "Li-Hung", image: LiHungImg },
      { name: "Terry" },
      { name: "Yu-Fang", image: YuFangImg },
      { name: "Hao-Ti" },
      { name: "Kun-Xian" },
      { name: "Jun-Li", image: JunLiImg },
      { name: "Wei-Syuan", image: WeiSyuanImg },
      { name: "En Shih", image: ShihEnImg },
    ],
  },
];

export default teams;
