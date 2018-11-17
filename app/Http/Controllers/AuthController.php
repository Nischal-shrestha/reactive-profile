<?php
namespace App\Http\Controllers;

use App\User;
use App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['jwt.auth'], ['except' => ['login', 'register', 'refresh']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        if ($request->has(['email', 'password'])) {
            $credentials = $request->only('email', 'password');
        } else {
            abort(401);
        }
        if (!$token = auth()->attempt($credentials)) {
            $response["status"] = "FAILED";
            $response["error"]["message"] = "Your credentials are invalid.";
        } else {
            $response["status"] = "SUCCESS";
            $response["access_token"] = $token;
            $response["token_type"] = "bearer";
            $response["user"]["name"] = auth()->user()->name;
            $response["user"]["email"] = auth()->user()->email;
            $response["expires_in"] = $this->payload()->get('exp');
        }
        return response()->json($response, 200);
       
        // return $this->respondWithToken($token);
    }

    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), User::$storeRules);
        if (!$validate->fails()) {
            $user = new User($request->all());
            $user->password = bcrypt($request->password);
            if ($user->save()) {

                $token = auth()->login($user);
                $exp = $this->payload()->get('exp');
                return response()->json(["status" => "CREATED", 'access_token' => $token, 'token_type' => 'bearer', 'expires_in' => $exp], 201); // 201 - created

            }
            return response()->json(["status" => "FAILED"], 400);
        } else {
            $errors["status"] = "FAILED";
            $errors["errors"] = $validate->errors();
            return response()->json($errors, 422);// 422 - unprocessable request
        }
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['status' => 'SUCCESS']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
    public function payload()
    {
        return auth()->payload();
    }
}