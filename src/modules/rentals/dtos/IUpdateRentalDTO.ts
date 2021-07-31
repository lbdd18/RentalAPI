interface IUpdateRentalDTO {
  id: string;
  user_id: string;
  car_id: string;
  expected_return_date: Date;
  end_date: Date;
  total: number;
}

export { IUpdateRentalDTO };
