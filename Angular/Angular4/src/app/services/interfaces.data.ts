export interface iPerson {
    name:string;
    age:number;
    address: iAddr;
    Hobbies:string[];
    }
  
  export interface iAddr{
    street: string;
    city: string;
    country: string;
  }

  export interface iPost{
    id: number,
    title:string,
    body:string,
    userId:number
  }