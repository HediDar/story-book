// __mocks__/request.js
const tasks = [
  {
    _id: "5f7c61ef72e7de0017f59ce6",
    name: "important task",
    description: "",
    important: true,
    done: true,
  },

  {
    _id: "5f7d9c19fffee20017541c25",
    name: "Test from Bouba",
    description: "This is just a test",
    important: false,
    done: true,
  },
  {
    _id: "5f7d9c88fffee20017541c26",
    name: "Hello from Hamza",
    description: "",
    important: false,
    done: false,
  },
  {
    _id: "5f7da19afffee20017541c27",
    name: "Integration of Github Actions",
    description: "",
    important: false,
    done: false,
  },
  {
    _id: "5f7f0714938a2e0017049866",
    name: "first task",
    description: "",
    important: false,
    done: false,
  },
];

export default {
  get: () => {
    return new Promise((resolve, reject) => {
      process.nextTick(() =>
        tasks
          ? resolve(tasks)
          : reject({
              error: "Tasks not found.",
            })
      );
    });
  },
};

// export default function get(url) {
//   return new Promise((resolve, reject) => {
//     process.nextTick(() =>
//       tasks
//         ? resolve(tasks)
//         : reject({
//             error: "Tasks not found.",
//           })
//     );
//   });
// }
