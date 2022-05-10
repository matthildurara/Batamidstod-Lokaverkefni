import {
  getDatabase,
  ref,
  set,
  onValue,
  DataSnapshot,
  remove,
} from "firebase/database";

export const getAllNotifications = async () => {
  const db = getDatabase();
  const dbRef = ref(db, "Users/Notifications");

  onValue(dbRef, (snapshot) => {
    // setAllNotifications([]);

    const allNotifications = [];
    console.log("=============MMMMM==========");
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      console.log("CHILDKEU IS ?");
      console.log(childKey);
      childSnapshot.forEach((childChild) => {
        const childchildKey = childChild.key;
        console.log("childchild key: ", childchildKey);
        const childValue = childChild.val();

        const item = {
          notification: childValue.notification,
          notificationTitle: childValue.notificationTitle,
        };

        allNotifications.push(item);

        // setAllNotifications((allNotifications) => [...allNotifications, item]);
      });
    });

    return allNotifications;
  });
};

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableHighlight,
//   TouchableOpacity,
//   TextInput,
//   SafeAreaView,
// } from "react-native";
// import {
//   getDatabase,
//   ref,
//   set,
//   onValue,
//   DataSnapshot,
//   remove,
// } from "firebase/database";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const getAllNotifications = async () => {
//   const [allNotifications, setAllNotifications] = useState([]);

//   //   const numerNotification = useState("");
//   // const getNotif = () => {
// const db = getDatabase();
// const dbRef = ref(db, "Users/Notifications");
// //async function getNotifications() {
// onValue(dbRef, (snapshot) => {
//   setAllNotifications([]);
//   console.log("=============MMMMM==========");
//   snapshot.forEach((childSnapshot) => {
//     const childKey = childSnapshot.key;
//     console.log("CHILDKEU IS ?");
//     console.log(childKey);
//     childSnapshot.forEach((childChild) => {
//       const childchildKey = childChild.key;
//       console.log("childchild key: ", childchildKey);
//       const childValue = childChild.val();

//       const item = {
//         notification: childValue.notification,
//         notificationTitle: childValue.notificationTitle,
//       };

//       setAllNotifications((allNotifications) => [...allNotifications, item]);
//     });
//   });
// });
//   // }
//   console.log("===============ALLNOTIFICATIONS======");
//   console.log(allNotifications);
//   return allNotifications;
//   // };
//   //   const numOfNotifications = allNotifications.length;
//   //   console.log(numOfNotifications);
//   //   AsyncStorage.setItem(
//   //     "NumberNotifications",
//   //     JSON.stringify(numOfNotifications)
//   //   );
//   // }

//   //console.log(allNotifications);
// };
// export default getAllNotifications;

// //
