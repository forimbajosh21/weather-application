<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

class OpenWeatherMapController extends Controller
{
    public function index(Request $request)
    {
        $validators = Validator::make($request->all(), [
            'city' => 'string|required',
            'country' => 'string|required',
        ]);
        if ($validators->fails()) {
            return response(array(
                'ok' => false,
                'message' => $validators,
            ), 500);
        } else {
            try {
                $curl = curl_init();
                curl_setopt_array($curl, array(
                    CURLOPT_URL => "https://api.openweathermap.org/data/2.5/forecast?q="
                    . $request->city
                    . ","
                    . $request->country
                    . "&mode=json&appid="
                    . env("ACCU_WEATHER_API_KEY"),
                    CURLOPT_RETURNTRANSFER => true,
                    CURLOPT_ENCODING => "",
                    CURLOPT_MAXREDIRS => 10,
                    CURLOPT_TIMEOUT => 30,
                    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
                    CURLOPT_CUSTOMREQUEST => "GET",
                    CURLOPT_HTTPHEADER => array(
                        "Cache-Control: no-cache",
                        "Postman-Token: c0b474be-fe64-4ac1-a7bb-a5b60f1c8e97",
                    ),
                ));
                $response = curl_exec($curl);
                $err = curl_error($curl);
                curl_close($curl);
                if ($err) {
                    return response(array(
                        'ok' => false,
                        'message' => $err,
                    ), 500);
                }
                $decodedResponse = json_decode($response, true);
                return response(array(
                    'ok' => true,
                    'message' => $decodedResponse,
                ), 200);
            } catch (Exception $e) {
                return response(array(
                    'ok' => false,
                    'message' => $e,
                ), 500);
            }
        }
    }
}
