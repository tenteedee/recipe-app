export const GENERATE_RECIPE_OPTION_PROMPT = `Dựa trên chỉ dẫn của người dùng, hãy tạo 3 biến thể công thức khác nhau.
    Mỗi công thức bao gồm tên có Emoji, 2 dòng mô tả, và danh sách các nguyên liệu chính.
    Hãy trả về kết quả CHỈ DƯỚI DẠNG một đối tượng JSON hợp lệ.
    Đối tượng JSON phải có một khóa chính là "recipes", giá trị là một mảng các công thức.
    Mỗi công thức trong mảng là một object có các khóa: "recipeName", "description", và "ingredients" (không có kích thước).
    KHÔNG được bao gồm bất kỳ văn bản giải thích nào, không có định dạng markdown \`\`\`json, và không có bất kỳ nội dung nào khác ngoài đối tượng JSON duy nhất.`;

export const GENERATE_COMPLETE_RECIPE = `
  - Dựa trên công thức đã tạo, hãy tạo một công thức hoàn chỉnh với các chi tiết sau:
        -Tên công thức, mô tả ngắn gọn, danh sách nguyên liệu (không có kích thước),
        -Các bước thực hiện chi tiết, thời gian nấu, số người phục vụ,
        -Tổng số calo, và một hình ảnh mô tả thực tế.
    - Đảm bảo rằng công thức được trình bày rõ ràng và dễ hiểu.
    - Trả về kết quả CHỈ DƯỚI DẠNG một đối tượng JSON hợp lệ.
    - Đối tượng JSON phải có các khóa: "recipeName", "description", "ingredients", "steps", "cookTime", "serveTo", "calories", "imagePrompt".
    - KHÔNG được bao gồm bất kỳ văn bản giải thích nào, không có định dạng markdown \`\`\`json, và không có bất kỳ nội dung nào khác ngoài đối tượng JSON duy nhất.
    - Cấu trúc JSON phải như sau:
    {
        "recipeName": "Tên công thức",
        "description": "Mô tả ngắn gọn về công thức",
        "ingredients": [
            {
                "ingredient": "Tên nguyên liệu",
                "icon": "Emoji biểu tượng cho nguyên liệu",
                "quantity": "Số lượng nguyên liệu"
            },
            // Thêm các nguyên liệu khác nếu cần
        ],
        "steps": [
            "Bước 1: Mô tả chi tiết bước thực hiện",
            "Bước 2: Mô tả chi tiết bước thực hiện",
            // Thêm các bước khác nếu cần
        ],
        "cookTime": "Thời gian nấu (ví dụ: 30 phút)",
        "serveTo": "Số người phục vụ (ví dụ: 4 người)",
        "calories": "Tổng số calo (chỉ số, ví dụ: 500)",
        "imagePrompt": "Mô tả hình ảnh thực tế cho công thức"
    }
    - Ví dụ:
    {
        "recipeName": "Bánh mì nướng bơ",
        "description": "Bánh mì nướng bơ giòn rụm, thơm ngon và dễ làm.",
        "ingredients": [
            {
                "ingredient": "Bánh mì",
                "icon": "🍞", // Emoji biểu tượng cho nguyên liệu                
                "quantity": "1 bánh mì"
            },
            {
                "ingredient": "Bơ",
                "icon": "🧈",
                "quantity": "2 muỗng canh"
            }
        ],
        "steps": [
            "Bước 1: Làm nóng chảo trên lửa vừa.",
            "Bước 2: Phết bơ lên mặt bánh mì.",
            "Bước 3: Nướng bánh mì trên chảo cho đến khi vàng giòn.",
            "Bước 4: Lật bánh mì và nướng mặt còn lại cho đến khi vàng giòn."
        ],
        "cookTime": "10 phút",
        "serveTo": "2 người",
        "calories": "300",
        "imagePrompt": "Hình ảnh bánh mì nướng bơ giòn rụm, với bơ tan chảy trên mặt bánh, được đặt trên đĩa trắng."
    }
    - Giải thích:
      - Trả về một công thức hoàn chỉnh dựa trên công thức đã tạo trước đó.
      - Đảm bảo rằng công thức bao gồm tất cả các chi tiết cần thiết để người dùng có thể thực hiện.
      - Cấu trúc JSON phải rõ ràng và dễ hiểu, với các khóa được định nghĩa rõ ràng.
      - Không bao gồm bất kỳ văn bản giải thích nào khác ngoài đối tượng JSON duy nhất.
      - Đảm bảo rằng các nguyên liệu được liệt kê với emoji biểu tượng, số lượng và không có kích thước.
      - Các bước thực hiện phải chi tiết và rõ ràng, giúp người dùng dễ dàng theo dõi.
      - Tổng số calo và thời gian nấu phải được cung cấp rõ ràng.
      - Hình ảnh mô tả thực tế phải được cung cấp dưới dạng một chuỗi mô tả rõ ràng
      - Đảm bảo rằng tất cả các thông tin được cung cấp là chính xác và có thể thực hiện được.
    - Lưu ý:
      - Đảm bảo rằng công thức được tạo ra là duy nhất và không trùng lặp với bất kỳ công thức nào đã có.
      - Tránh sử dụng các nguyên liệu hoặc bước thực hiện quá phức tạp, để người dùng có thể dễ dàng thực hiện công thức.
      - Đảm bảo rằng công thức có thể được thực hiện trong thời gian nấu đã cung cấp.
      - Tránh sử dụng các thuật ngữ kỹ thuật hoặc chuyên ngành mà người dùng có thể không hiểu.
      - Đảm bảo rằng công thức có thể được thực hiện với các nguyên liệu và dụng cụ thông thường mà người dùng có thể dễ dàng tìm thấy.
    - Cấu trúc JSON phải tuân thủ các quy tắc sau:
        - Mỗi khóa phải được đặt trong dấu ngoặc kép.
        - Các giá trị chuỗi phải được đặt trong dấu ngoặc kép.
        - Các giá trị số không cần dấu ngoặc kép.
        - Các giá trị mảng phải được đặt trong dấu ngoặc vuông [].
        - Các giá trị đối tượng phải được đặt trong dấu ngoặc nhọn {}.
        - Không được sử dụng dấu phẩy cuối cùng trong các đối tượng hoặc mảng.
        - Đảm bảo rằng tất cả các khóa và giá trị đều được phân tách bằng dấu hai chấm (:).
        - Đảm bảo rằng tất cả các chuỗi đều được mã hóa đúng cách, bao gồm các ký tự đặc biệt nếu cần.
        - Đảm bảo rằng tất cả các giá trị đều được định dạng đúng cách, bao gồm các số, chuỗi và mảng.
        - Đảm bảo rằng tất cả các khóa đều duy nhất trong đối tượng JSON
        - Đảm bảo rằng tất cả các giá trị đều có thể được hiểu và sử dụng
        - Đảm bảo rằng tất cả các thông tin được cung cấp là chính xác và có thể thực hiện được.
    - Ví dụ về cách sử dụng:
    - Khi người dùng cung cấp một công thức, hãy sử dụng prompt này để tạo ra một công thức hoàn chỉnh với tất cả các chi tiết cần thiết.
    - Đảm bảo rằng công thức được tạo ra là duy nhất và không trùng lặp với bất kỳ công thức nào đã có.
    - Trả về kết quả CHỈ DƯỚI DẠNG một đối tượng JSON hợp lệ.
    - Đảm bảo rằng tất cả các thông tin được cung cấp là chính xác và có thể thực hiện được.
    - Tránh sử dụng các nguyên liệu hoặc bước thực hiện quá phức tạp, để người dùng có thể dễ dàng thực hiện công thức.
    - Đảm bảo rằng công thức có thể được thực hiện trong thời gian nấu đã cung cấp.
    - Tránh sử dụng các thuật ngữ kỹ thuật hoặc chuyên ngành mà người dùng có thể không hiểu.
    - Đảm bảo rằng công thức có thể được thực hiện với các nguyên liệu và dụng cụ thông thường mà người dùng có thể dễ dàng tìm thấy.
    - Đảm bảo rằng tất cả các thông tin được cung cấp là chính xác và có thể thực hiện được.
    - Đảm bảo rằng công thức được tạo ra là duy nhất và không trùng lặp với bất kỳ công thức nào đã có.
    - Tránh sử dụng các nguyên liệu hoặc bước thực hiện quá phức tạp, để người dùng có thể dễ dàng thực hiện công thức.
    - Đảm bảo rằng công thức có thể được thực hiện trong thời gian nấu đã cung cấp.
    - Tránh sử dụng các thuật ngữ kỹ thuật hoặc chuyên ngành mà người dùng có thể không hiểu.
    - Đảm bảo rằng công thức có thể được thực hiện với các nguyên liệu và dụng cụ thông thường mà người dùng có thể dễ dàng tìm thấy.`;
