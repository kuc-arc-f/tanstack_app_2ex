import { createFileRoute } from '@tanstack/react-router'
import Config from '../../config'
import path from 'path';
import { promises as fs } from 'fs';

export const Route = createFileRoute('/api/auth_verify_otp')({
  server: {
    handlers: {

      // POST
      POST: async ({ request }) => {

        const body = await request.json()
        console.log(body)
        const email = body.email;
        const code = body.code;
        if (typeof email !== 'string' || email.length < 3 || email.length > 64) {
          return Response.json({
            success: false,
            message: 'email は 3〜64 文字です',
            data: body,
          })
        }
        if (typeof code !== 'string' || code.length < 3 || email.code > 64) {
          return Response.json({
            success: false,
            message: 'error, code = NG',
            data: body,
          })
        }
        // 送信したいデータ
        const data = {
          email: email,
          code: code,
        };
        try {
          console.log("url=", Config.EXTERNAL_API_URL)
          const response = await fetch(Config.EXTERNAL_API_URL + '/auth/verify-otp', {
            method: 'POST', // リクエストメソッドを指定
            headers: {
              'Content-Type': 'application/json' // JSONを送ることを伝える
            },
            body: JSON.stringify(data) // データをJSON文字列に変換
          });
          if (!response.ok) {
            throw new Error(`HTTPエラー! ステータス: ${response.status}`);
          }
          // 返ってきたJSONデータを解析
          const result = await response.json();
          console.log('成功:', result);
          return Response.json({
            success: true,
            message: 'INSERT OK',
            data: body,
          })          
        } catch (error) {
          console.error('エラーが発生しました:', error);
          return Response.json({
            success: false,
            message: 'エラーが発生しました:',
            data: body,
          })          
        }        
        return Response.json({
          success: true,
          message: 'LOGIN OK',
          data: body,
        })
      },

    },
  },
})