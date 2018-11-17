<?php
namespace App\Exceptions;

use Exception;
use Illuminate\Auth\AuthenticationException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];
    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];
    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        // detect instance
        if ($exception instanceof UnauthorizedHttpException) {
            // detect previous instance
            if ($exception->getPrevious() instanceof TokenExpiredException) {
                return response()->json(['error' => 'TOKEN_EXPIRED'], $exception->getStatusCode());
            } else if ($exception->getPrevious() instanceof TokenInvalidException) {
                return response()->json(['error' => 'TOKEN_INVALID'], $exception->getStatusCode());
            } else if ($exception->getPrevious() instanceof TokenBlacklistedException) {
                return response()->json(['error' => 'TOKEN_BLACKLISTED'], $exception->getStatusCode());
            } else {
                return response()->json(['error' => "UNAUTHORIZED_REQUEST"], 401);
            }
        } else if ($exception instanceof ModelNotFoundException) {
            return response()->json(['error' => 'MODEL_NOT_FOUND'], 404);
        } else if ($exception instanceof NotFoundHttpException) {
            return response()->json(['error' => 'URL_NOT_FOUND'], 404);
        } else if ($exception instanceof HttpException) {
            return response()->json(['error' => 'ACCESS_DENIED'], 403);
        } else if ($exception->getPrevious() instanceof TokenExpiredException) {
            return response()->json(['error' => 'TOKEN_EXPIRED'], $exception->getStatusCode());
        } else if ($exception->getPrevious() instanceof TokenInvalidException) {
            return response()->json(['error' => 'TOKEN_INVALID'], $exception->getStatusCode());
        } else if ($exception->getPrevious() instanceof TokenBlacklistedException) {
            return response()->json(['error' => 'TOKEN_BLACKLISTED'], $exception->getStatusCode());
        }
        return parent::render($request, $exception);
    }
}