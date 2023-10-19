module.exports = function random(arg)
{
  if(Array.isArray(arg))
  {
    return arg[Math.floor(Math.random()*arg.length)]
  }
  else if(typeof arg == "number")
  {
    return Math.floor(Math.random()*arg)
  }
}