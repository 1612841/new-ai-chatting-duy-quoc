import { DefaultUser } from 'assets';
import { TLoginDto } from 'types';

type TUser = TLoginDto;

export const User = ({ username, online }: TUser) => {
  return (
    <>
      <img src={DefaultUser} alt="user-logo" className="w-10 h-10 rounded-full object-cover" />
      <div>
        <h2 className="font-bold text-[#589ff1]">{username}</h2>
        <sub className={online ? 'text-green-600' : 'text-gray-500'}>
          {online ? 'Online' : 'Offline'}
        </sub>
      </div>
    </>
  );
};
