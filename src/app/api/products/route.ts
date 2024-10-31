import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../utils/connectDB";
import Products from "../../../../models/Product";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    console.log(body);

    const {
      name,
      ingredients,
      isVegan,
      category,
      weight,
      calory,
      price,
    } = body ;


    console.log({name , ingredients , isVegan , category , weight , calory ,price} );

    if (!name || !ingredients.length || !category || !weight || !calory || !price) {
      return NextResponse.json(
        { message: "Please fill in all the fields." , status: 400  }
      );
    }

    const newProduct = await Products.create({
      name,
      ingredients,
      isVegan,
      category,
      weight: +weight,
      calory: +calory,
      price: +price,
    });
    // console.log(newProduct);

    const allProducts = await Products.find()
    
    return NextResponse.json(
      { message: "The new product has been added.", newData: newProduct , allProducts:allProducts , status: 201  },
    );
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "There has been a problem on the server!" , status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const products = await Products.find();
    // console.log(products)
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "There has been a problem on the server!" , status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json()
    const { _id , name, ingredients, isVegan, category, weight, calory, price} = body;
    
    if (!name || !ingredients.length || !category || !weight || !calory || !price) {
      return NextResponse.json({ message: "please enter valid data" , status: 400});
    }
    
    const product = await Products.findOne({ _id: _id });

    product.name = name;
    product.ingredients = ingredients;
    product.isVegan = isVegan;
    product.category = category;
    product.weight = weight;
    product.calory = calory;
    product.price = price;

    product.save()

    return NextResponse.json({message:"The product has been edited" , data: product , status: 200})

  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "There has been a problem on the server!" , status: 500 },)
  }
}
