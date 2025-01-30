[Watch Demo](https://drive.google.com/file/d/1CxO52YMSMxWFg76aa4SQ-Sjjhjyi_86A/view)

# React Native Project Dependencies

This document provides details about the required dependencies for the project, their purpose, and installation instructions.

---

## 📦 Required Dependencies

### 1️⃣ **@react-native-community/cli**
- **Purpose:**  
  - Provides essential CLI tools for managing a React Native project.
  - Used for running commands like `react-native run-android`, `react-native run-ios`, and debugging.
- **Installation:**
  ```sh
  npm install -g @react-native-community/cli
  ```
  or
  ```sh
  yarn global add @react-native-community/cli
  ```
  ⚠️ Ensure that `react-native-cli` is not installed globally to avoid conflicts.

---

### 2️⃣ **react-native-linear-gradient**
- **Purpose:**  
  - Enables the use of gradient backgrounds in React Native apps.
  - Supports linear gradient effects for UI enhancements.
- **Installation:**
  ```sh
  npm install react-native-linear-gradient
  ```
  or
  ```sh
  yarn add react-native-linear-gradient
  ```
- **Usage Example:**
  ```jsx
  import LinearGradient from 'react-native-linear-gradient';

  const GradientBackground = () => (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={{ flex: 1 }}
    />
  );
  ```

- **Linking (For older versions)**
  If using React Native < 0.60, run:
  ```sh
  react-native link react-native-linear-gradient
  ```

---

### 3️⃣ **react-native-reanimated**
- **Purpose:**  
  - Provides improved animations in React Native.
  - Used for gesture-based animations and complex UI interactions.
- **Installation:**
  ```sh
  npm install react-native-reanimated
  ```
  or
  ```sh
  yarn add react-native-reanimated
  ```
- **Additional Setup:**
  - If using **React Native 0.65+**, ensure that `react-native-reanimated/plugin` is added to `babel.config.js`:
    ```js
    module.exports = {
      presets: ['module:metro-react-native-babel-preset'],
      plugins: ['react-native-reanimated/plugin'],
    };
    ```
  - **Enable Hermes Engine** for better performance:
    ```sh
    npx react-native start --reset-cache
    ```

- **Usage Example:**
  ```jsx
  import Animated, { Easing } from 'react-native-reanimated';

  const animation = new Animated.Value(0);

  Animated.timing(animation, {
    toValue: 1,
    duration: 500,
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  }).start();
  ```

---

## 🎯 Final Notes
- Always ensure dependencies are correctly installed and linked.
- If issues arise, try clearing the cache:
  ```sh
  npm start -- --reset-cache
  ```
- For native iOS projects, don’t forget to install pods:
  ```sh
  cd ios && pod install && cd ..
  ```

---

## 💻 Metro Config

```js
const config = {
    resolver: {
        sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
        assetExts: ['glb', 'gltf', 'png', 'jpg'],
    }
};
```

🚀 **Happy Coding!** 🎨✨
