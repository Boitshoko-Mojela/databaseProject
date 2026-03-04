import mysql.connector
import os

# Connect to MySQL database
conn = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Bradlee91@',  # 🔁 Replace this with your MySQL password
    database='new_schema'
)
cursor = conn.cursor()

# Function to read image as binary
def read_image(file_path):
    with open(file_path, 'rb') as file:
        return file.read()

# Directory containing your images
image_dir = "C:/Users/boits/Downloads/products"

# List of product details and corresponding image file names
products = [
    (1, "jeans", 499, "jeans.webp"),
    (2, "sneakers", 1200, "sneakers.webp"),
    (3, "tshirt", 250, "t_shirt.webp"),
    (4, "jacket", 500, "jacket.webp"),
    (5, "dress", 400, "dress.webp")
]

# Prepare SQL and insert each product
sql = """
    INSERT INTO product (Product_ID, Product_Name, Product_Cost, Product_Picture)
    VALUES (%s, %s, %s, %s)
"""

for prod_id, name, cost, image_filename in products:
    image_path = os.path.join(image_dir, image_filename)
    if os.path.exists(image_path):
        image_data = read_image(image_path)
        cursor.execute(sql, (prod_id, name, cost, image_data))
        print(f"Inserted {name}")
    else:
        print(f"Image not found: {image_path}")

# Finalize
conn.commit()
conn.close()
print("✅ All available products inserted successfully.")
