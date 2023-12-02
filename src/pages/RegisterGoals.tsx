import { useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useParams } from 'react-router-dom';

import data, { Skin } from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Sticker } from '@phosphor-icons/react';

import { BottomNavigator } from 'components/BottomNavigator';
import { DatePickerInput } from 'components/DatePickerInput';
import { Header } from 'components/Header';
import { InputError } from 'components/InputError';

import { cn } from 'utils/cn';

import { useTheme } from 'contexts/Theme';

import { useRegisterGoals } from 'hooks/useRegisterGoals';

export function RegisterGoals() {
  const { theme } = useTheme();
  const { id } = useParams();
  const { formik } = useRegisterGoals();

  const [showEmojis, setShowEmojis] = useState(false);

  return (
    <div className="flex w-full flex-col items-center bg-background dark:bg-background-dark">
      <Header title="Metas" />

      <form className="flex w-full flex-col" onSubmit={formik.handleSubmit}>
        <div className="flex h-screen w-full flex-col gap-4 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex w-full flex-col">
              <input
                type="text"
                className={cn(
                  'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                  formik.errors.title &&
                    formik.touched.title &&
                    'border-[1.5px] border-danger',
                )}
                placeholder="Nome da meta"
                {...formik.getFieldProps('title')}
              />
              {formik.errors.title && formik.touched.title && (
                <InputError
                  className="mt-1"
                  error={true}
                  message={formik.errors.title}
                />
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex w-full flex-col">
                <input
                  type="text"
                  className={cn(
                    'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
                    formik.errors.emoji &&
                      formik.touched.emoji &&
                      'border-[1.5px] border-danger',
                  )}
                  placeholder="Emoji"
                  maxLength={1}
                  {...formik.getFieldProps('emoji')}
                />
                {formik.errors.emoji && formik.touched.emoji && (
                  <InputError
                    className="mt-1"
                    error={true}
                    message={formik.errors.emoji}
                  />
                )}
              </div>

              <button
                type="button"
                className={cn(
                  'h-14 w-14 rounded-lg bg-background-card p-4 text-title outline-none dark:bg-background-card-dark dark:text-title-dark',
                  formik.errors.emoji &&
                    formik.touched.emoji &&
                    'border-[1.5px] border-danger',
                )}
                onClick={() => {
                  setShowEmojis(!showEmojis);
                }}
              >
                {showEmojis ? (
                  <Sticker
                    weight="fill"
                    size={20}
                    className="text-title dark:text-title-dark"
                  />
                ) : (
                  <Sticker
                    size={20}
                    className="text-title dark:text-title-dark"
                  />
                )}
              </button>

              {showEmojis && (
                <div className="absolute right-2 top-44 z-100">
                  <Picker
                    data={data}
                    emojiSize={20}
                    emojiButtonSize={28}
                    onEmojiSelect={(emoji: Skin) => {
                      formik.setFieldValue('emoji', emoji.native);
                      setShowEmojis(false);
                    }}
                    maxFrequentRows={0}
                    maxLength={1}
                    theme={theme === 'light' ? 'light' : 'dark'}
                    locale="pt"
                  />
                </div>
              )}
            </div>
          </div>

          <textarea
            className={cn(
              'h-28 w-full resize-none rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
              formik.errors.description &&
                formik.touched.description &&
                'border-[1.5px] border-danger',
            )}
            placeholder="Descrição"
            maxLength={140}
            {...formik.getFieldProps('description')}
          />
          <span
            className={cn(
              '-mt-2 text-xs text-title dark:text-title-dark',
              formik.values.description.length >= 140
                ? 'text-dangborder-danger'
                : 'text-gray-400',
            )}
          >
            <div className="absolute left-6 top-[16.7rem] h-14 w-14">
              <svg
                className="-rotate-90 transform"
                width="35%"
                height="35%"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke={theme === 'light' ? '#F0F2F5' : '#1f2223'}
                  strokeWidth="12"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  className="stroke-primary dark:stroke-primary-dark"
                  strokeWidth="12"
                  strokeDasharray={`${
                    (formik.values.description.length / 140) * 339
                  } 339`}
                />
              </svg>
            </div>
          </span>
          {formik.errors.description && formik.touched.description && (
            <InputError error={true} message={formik.errors.description} />
          )}

          <CurrencyInput
            prefix="R$ "
            placeholder="Qual seu objetivo? R$ 0,00"
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            value={formik.values.value}
            onValueChange={(value) => {
              formik.setFieldValue('value', value);
            }}
            className={cn(
              'h-14 w-full rounded-lg bg-background-card p-4 text-title outline-none focus:ring-2 focus:ring-primary dark:bg-background-card-dark dark:text-title-dark focus:dark:ring-primary-dark',
              formik.errors.value &&
                formik.touched.value &&
                'border-[1.5px] border-danger',
            )}
          />

          {formik.errors.value && formik.touched.value && (
            <InputError error={true} message={formik.errors.value} />
          )}

          <span className="flex items-center gap-2 text-sm text-title dark:text-title-dark">
            Data de início:
          </span>
          <DatePickerInput
            onChange={(date) => {
              formik.setFieldValue('date_initial', date);
            }}
            value={formik.values.date_initial}
            error={formik.errors.date_initial && formik.touched.date_initial}
            className="focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
          />
          {formik.errors.date_initial && formik.touched.date_initial && (
            <InputError error={true} message={formik.errors.date_initial} />
          )}

          <span className="flex items-center gap-2 text-sm text-title dark:text-title-dark">
            Data de conclusão:
          </span>
          <DatePickerInput
            onChange={(date) => {
              formik.setFieldValue('date_final', date);
            }}
            value={formik.values.date_final}
            error={formik.errors.date_final && formik.touched.date_final}
            className="focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
          />
          {formik.errors.date_final && formik.touched.date_final && (
            <InputError error={true} message={formik.errors.date_final} />
          )}

          <div className="flex flex-col items-center justify-end gap-4">
            <button
              type="submit"
              className="h-14 w-full rounded-lg bg-primary p-4 text-white dark:bg-primary-dark"
            >
              {id ? 'Editar' : 'Cadastrar'}
            </button>
          </div>
        </div>
      </form>

      <BottomNavigator />
    </div>
  );
}
