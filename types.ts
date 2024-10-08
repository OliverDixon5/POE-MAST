
export interface Dish {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
}



export type RootStackParamList = {
  Menu: undefined;
  AddDish: { menu: Dish[]; setMenu: React.Dispatch<React.SetStateAction<Dish[]>> };
};



