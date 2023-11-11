import React, { useContext, useState } from "react";
import NavbarHeader from "../components/NavbarHeader";
import { Food } from "../context";
import PopupChat from "../components/PopupChat";
function Fitness() {
  
  const exercises = [
            { id: 1, name: 'Bench Press', gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif', dis1: "Nhóm cơ: Ngực", dis2: "Thiết bị: Tạ đòn - Ghế dài - Phòng tập Gym", dis3: "Máy ép băng ghế dự bị là một trong những bài tập kết hợp phổ biến nhất trong thể hình. Đây là một bài tập quan trọng không chỉ để phát triển cơ ngực, mà còn để tăng sức mạnh và sức bền trên cơ thể." },
            { id: 2, name: 'Jump Squats', gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Jump-Squat.gif', dis1: "Nhóm cơ: Tim mạch - Hông - Chân", dis2: "Thiết bị: Không cần thiết bị", dis3: "Jump Squats là một bài tập plyometric. Plyometrics là những động tác aerobic bùng nổ giúp tăng tốc độ, sự nhanh chóng và sức mạnh và chúng hoạt động toàn bộ cơ thể bạn." },
            { id: 3, name: 'Deadlifts', gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif', dis1: "Nhóm cơ: Xương đòn- Cột sống - Hông - Chân", dis2: "Thiết bị: Tạ đòn - Phòng tập Gym", dis3: "Deadlift là một trong những bài tập kết hợp hiệu quả nhất. Nó được thể hiện như một bài tập sức mạnh cơ bản trong các môn thể thao sức mạnh như cử tạ. Đây là động tác rèn luyện sức mạnh phổ biến nhất vì nó hoạt động nhiều nhóm cơ. " },
            { id: 4, name: 'Push-ups', gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif', dis1: "Nhóm cơ: Ngực - Vai trước - Tay sau", dis2: "Thiết bị: Không cần thiết bị", dis3: "Chống đẩy là một bài tập nhanh và hiệu quả để tăng cường sức mạnh. Chống đẩy với số lần lặp lại cao giúp xây dựng sức bền cơ bắp đồng thời cải thiện hệ thống tim mạch của bạn. Nhờ cơ bắp bền bỉ, thành tích thể thao của bạn sẽ tăng lên một cách tự nhiên và bạn sẽ có khả năng chống chấn thương cao hơn." },
            { id: 5, name: 'Pull-ups', gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2022/08/how-to-do-pull-up.gif', dis1: "Nhóm cơ: Tay trước- Lưng - Xô- Vai sau", dis2: "Thiết bị: Xà đơn", dis3: "Kéo xà là một bài tập rèn luyện sức mạnh theo chuỗi khép kín, sử dụng toàn bộ trọng lượng cơ thể của bạn, đặc biệt tập trung vào phần thân trên và phần lõi của bạn. " },
            { id: 6, name: 'Barbell Bent Over Row', gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bent-Over-Row.gif', dis1: "Nhóm cơ: Toàn thân - Cột sống - Cánh tay", dis2: "Thiết bị: Tạ đòn", dis3: "Hàng cúi tạ là một bài tập kết hợp được sử dụng để phát triển và củng cố toàn bộ chuỗi sau, bao gồm cả hông và lưng trên. Trong khi hầu hết các bài tập nhắm vào một cơ bắp cụ thể ở phía sau cơ thể, bài tập kết hợp này nhắm vào toàn bộ lưng mỗi lần." },
            { id: 7, name: 'Cross Crunch', gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2022/07/Cross-Crunch.gif', dis1: "Nhóm cơ: Bụng", dis2: "Thiết bị: Không cần thiết bị", dis3: "Bài tập cốt lõi đơn giản nhưng hiệu quả này hoạt động xiên và bụng của bạn, xây dựng cả sức mạnh xoay và khả năng của cốt lõi để ổn định cột sống và hông của bạn chống lại các lực quay bên ngoài." },
            { id: 8, name: 'Seated Bench Leg Pull-in', gifUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Bench-Leg-Pull-in.gif', dis1: "Nhóm cơ: Bụng", dis2: "Thiết bị: Ghế dài", dis3: "Bài tập này là một trong những động tác hiệu quả nhất làm việc cơ bụng của bạn. Bạn có thể đưa nó vào các chương trình đào tạo của bạn để phá vỡ và thắt chặt các chất béo tích lũy, đặc biệt là ở cơ bụng dưới của bạn." },
            { id: 9, name: 'Bicycle Crunch', gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Bicycle-Crunch.gif", dis1: "Nhóm cơ: Bụng - Đốt mỡ", dis2: "Thiết bị: Không cần thiết bị", dis3: "Trong một nghiên cứu được thực hiện bởi Hội đồng Thể dục Hoa Kỳ, bài tập gập xe đạp được mô tả là một trong những bài tập hiệu quả nhất hoạt động tốt nhất cho bụng trực tràng, tăng cường cơ bụng và hỗ trợ hình thành sáu múi." },
            { id: 10, name: 'Kneeling Cable Crunch', gifUrl: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Kneeling-Cable-Crunch.gif", dis1: "Nhóm cơ: Bụng", dis2: "Thiết bị: Bộ Cáp", dis3: "Nhóm cơ đầu tiên hoạt động trong bài tập này là bụng trực tràng, cơ bắp sáu múi của bạn. Nó cũng giúp làm việc trên các cơ cốt lõi khác. Để tận dụng tối đa bài tập này, điều quan trọng là động tác phải được thực hiện đúng hình dạng. Nó có thể không phù hợp cho người mới bắt đầu và những người bị chấn thương lưng." }
      ];
  const [searchExercise, setSearchExercise] = useState("");

  return (
    <div>
      <Food.Provider
        value={{
          searchExercise,
          setSearchExercise,
        }}
      >
        <NavbarHeader />
        <div className="container">
          <h1>Basic Exercises for Muscle Gain</h1>
          <div className="row" style={{ marginTop: "2rem" }}>
            {exercises.map((exercise) => (
              <div
                className="col-md-4 "
                style={{ marginBottom: "3rem" }}
                key={exercise.id}
              >
                <div className="fitness-card">
                  <h3 className="text-center mt-3">{exercise.name}</h3>
                  <img src={exercise.gifUrl} alt={exercise.name} />
                  <div className="" style={{textAlign:"center"}}>
                    <h5 style={{ marginTop: "1rem" }}>{exercise.dis1}</h5>
                    <h5 >{exercise.dis2}</h5>
                    <p>{exercise.dis3}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PopupChat />
      </Food.Provider>
    </div>
  );
}

export default Fitness;
