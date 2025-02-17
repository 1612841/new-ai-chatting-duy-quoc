import { animated } from '@react-spring/web';
import { useMouseSpring } from './Login.config';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useUserStore } from 'store';

export const Login = () => {
  const animatedProps = useMouseSpring();
  const setUserName = useUserStore((state) => state.setUserName);

  const [name, setName] = useState<string>();

  const handleLogin = async () => {
    if (!name) return setName('');
    setUserName(name);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && handleLogin();

  return (
    <animated.div
      {...animatedProps}
      className="w-screen h-screen flex justify-center"
    >
      <div className="w-80 flex flex-col justify-center items-center gap-6">
        <input
          className={`w-full p-3 text-xl border rounded-lg shadow-md outline-none focus:bg-sky-100 focus:border-sky-200 ${
            typeof name === 'string' && !name && 'border-red-500'
          }`}
          type="text"
          placeholder="Your name..."
          value={name}
          onChange={handleChangeName}
          onKeyUp={handleEnter}
        />

        <button
          className="w-full py-2 text-lg outline cursor-pointer active:bg-sky-950 hover:bg-sky-800 hover:text-blue-50 hover:rounded-lg duration-150 transition-all ease-in-out"
          type="submit"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </animated.div>
  );
};
