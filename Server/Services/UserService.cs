using FromTheFarmer.Data;
using FromTheFarmer.Data.DTO;
using FromTheFarmer.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Threading.Tasks;

namespace FromTheFarmer.Services
{
    public class UserService
    {
        // תקציר
        /////////
        //בנאי
        //קבלת תוקןJWT
        //עדכון תאריך אחרון שהמשתמש התחבר 
        //קבלת משתמש על פי JWT
        // קבלת רשימת משתמשים שהם לא מנהלים מוגבל למנהל
        // הוספת משתמש
        // בדיקת האם קיים מייל
        // קבלת רשימת משתמשים
        // קבלת משתמש על פי מזהה
        // קבלת משתמש על פי מייל
        // הזדאות
        // עדכון משתמש
        // עדכון רול למשתמש מוגבל למנהל
        // מחיקת משתמש לאדמין
        // מחיקת משתמש
        // הצפנת סיסמה
        //שליחת סיסמה חדשה למיל של המשתשמש ושמירה במאגר הנותנים שלו
        //יצירת סיסמה חדשה מוצפנת

        private readonly FromTheFarmerDBContext m_db;
        private readonly JwtService _jwtService;
        private readonly FavoriteService _FavoriteService;

        //בנאי
        public UserService(FromTheFarmerDBContext db,JwtService jwt, FavoriteService favoriteService)
        {           
            m_db = db;
            _jwtService = jwt;
            _FavoriteService = favoriteService;
        }

        //קבלת תוקןJWT
        public string GetToken(string id ,string role)
        {
            return _jwtService.GenerateToken(id, role);
        }

        //עדכון תאריך אחרון שהמשתמש התחבר
        public bool UpdateLastLogin(User UserFromControler)
        {
            UserFromControler.LastLogin = DateTime.Now;
            int c = m_db.SaveChanges();
            return c > 0;
        }

        //קבלת משתמש על פי JWT
        public User GetUserByJWT()
        {
            string id = _jwtService.GetTokenClaims();
            return GetUser(int.Parse(id));
        }

        //קבלת רשימת משתמשים שהם לא מנהלים מוגבל למנהל
        public List<User>GetAllUsersNotAdmin()
        {
            return m_db.User.Where(u => u.Role != "Admin").ToList();
        }

        // הוספת משתמש
        public bool AddUser(UserDTO users)
        {
            if(GetUserEmail(users.Mail)!=null)
            {
                return false;
            }
            User user1 = new User();
            user1.Mail = users.Mail;
            user1.FirstName = users.FirstName;
            user1.LastName = users.LastName;
            user1.RegisterDate = DateTime.Now; 
            user1.Birthdate = users.Birthdate;
            user1.Phone = users.Phone;
            user1.Role = users.Role;
            user1.LastLogin = DateTime.Now;
            user1.Password = GetMD5(users.Password);
            user1.IsActive = true;   
            m_db.User.Add(user1); 
            int c = m_db.SaveChanges();
            return c > 0;
        }

        // בדיקת האם קיים מייל
        public bool CheckEmail(string Email)
        {
            int count = 0;
            try
            {
                count = m_db.User.Where(u => u.Mail == Email).Count();
            }
            catch
            {
                return false;//לא קיים משתמש כזה
            }
            return count >= 1;//קיים משתמש כזה
        }

        // קבלת רשימת משתמשים
        public List<User> GetUsers()
        {
            return m_db.User.ToList();
        }

        // קבלת משתמש על פי מזהה
        public User GetUser(int id)
        {
            return m_db.User.Where(user => user.Id == id).FirstOrDefault();
        }

        // קבלת משתמש על פי מייל
        public User GetUserEmail(string Mail)
        {
            return m_db.User.Where(user => user.Mail == Mail).FirstOrDefault();
        }

        // הזדאות
        public User GetUserForLogin(string email, string password)
        {
            string passwordAfterMD5 = GetMD5(password);
            return m_db.User.Where(user => user.Mail.ToLower() == email.ToLower() && user.Password == passwordAfterMD5).FirstOrDefault();
        }

        // עדכון משתמש
        public ResponseDTO UpdateUser(UserDTO UserToUpdate)
        {
            User UserFromDB = GetUserByJWT();
            ResponseDTO response = new ResponseDTO();
            if (UserFromDB.Id != UserToUpdate.Id)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Bad Request";
            }
            try
            {
                UserFromDB.FirstName = UserToUpdate.FirstName;
                UserFromDB.LastName =  UserToUpdate.LastName;
                UserFromDB.Birthdate = UserToUpdate.Birthdate;
                UserFromDB.Phone =  UserToUpdate.Phone;
                UserFromDB.LastLogin = UserToUpdate.LastLogin;
                UserFromDB.IsActive = UserToUpdate.IsActive;
                //אם יש סיסמה והיא שונה ממהצפנה נשמור אותה 
                if (UserFromDB.Password != UserToUpdate.Password && UserToUpdate.Password != null)
                {
                    UserFromDB.Password = GetMD5(UserToUpdate.Password);
                }

                int c = m_db.SaveChanges();
                if (c > 0)
                {
                    return new ResponseDTO { Status = StatusCode.Success };
                }
            }
            catch (Exception)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"לא הצלחנו לשמור את השינוי, ערך אחד או כמה אינם תקינים";
            }
            return response;
        }


        //עדכון רול למשתמש מוגבל למנהל
        public ResponseDTO UpdateUserRoleForAdmin(int id, UserDTO UserToUpdate)
        {
            User UserFromDB = GetUser(id);
            ResponseDTO response = new ResponseDTO();
            if (id != UserToUpdate.Id)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"Bad Request";
            }
            try
            {
                UserFromDB.Role = UserToUpdate.Role;
                int c = m_db.SaveChanges();
                if (c > 0)
                {
                    return new ResponseDTO { Status = StatusCode.Success };
                }
            }
            catch (Exception)
            {
                response.Status = StatusCode.Error;
                response.StatusText = $"לא הצלחנו לשמור את השינוי, ערך אחד או כמה אינם תקינים";
            }
            return response;
        }


        // מחיקת משתמש לאדמין
        public ResponseDTO DeleteUserForAdmin(int id)
        {
            User UserToDelete = GetUser(id);
            Customer customer = m_db.Customer.Where(c => c.UserId == UserToDelete.Id).FirstOrDefault();
            if (customer != null)
            {
                ResponseDTO res = _FavoriteService.DeleteAllFavoriteById(customer.Id);
                if (res.Status == Data.DTO.StatusCode.Error && (res.StatusText == "משתמש לא מורשה" || res.StatusText == "לא הצלחנו למחוק את כל הרשימה"))
                {
                    return res;
                }
            }
            ResponseDTO response = new ResponseDTO();
            if (UserToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"User with id:{id} not found in DB"
                };
            }
            m_db.User.Remove(UserToDelete);
            m_db.SaveChanges();
            response.StatusText = $"המשתמש נמחק בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }

        //מחיקת משתמש
        public ResponseDTO DeleteUser()
        {
            User UserToDelete = GetUserByJWT();
            Customer customer = m_db.Customer.Where(c => c.UserId == UserToDelete.Id).FirstOrDefault();
            if(customer!=null)
            {
                ResponseDTO res = _FavoriteService.DeleteAllFavoriteById(customer.Id);
                if (res.Status == Data.DTO.StatusCode.Error && (res.StatusText == "משתמש לא מורשה" || res.StatusText == "לא הצלחנו למחוק את כל הרשימה"))
                {
                    return res;
                }
            }
            ResponseDTO response = new ResponseDTO();
            if (UserToDelete == null)
            {
                return new ResponseDTO()
                {
                    Status = StatusCode.Error,
                    StatusText = $"User with id:{UserToDelete.Id} not found in DB"
                };
            }
            m_db.User.Remove(UserToDelete);
            m_db.SaveChanges();
            response.StatusText = $"המשתמש נמחק בהצלחה";
            response.Status = StatusCode.Success;
            return response;
        }


        // הצפנת סיסמה
        private string GetMD5(string input) 
        {
            using (var md5 = MD5.Create())
            {
                var result = md5.ComputeHash(Encoding.ASCII.GetBytes(input));
                var strResult = BitConverter.ToString(result);
                return strResult.Replace("-", "");
            }
        }

        //שליחת סיסמה חדשה למיל של המשתשמש ושמירה במאגר הנותנים שלו
        public bool ForgotPassword(string mailto)
        {
            User user = GetUserEmail(mailto);
            string newPassword = NewPassword();
            if (user==null||user.Mail!=mailto)
            {
                return false;
            }
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("fromthefarmerisrael@gmail.com");
                message.To.Add(new MailAddress(mailto));
                message.Subject = "בקשתך לשינוי סיסמה";
                message.IsBodyHtml = true; //to make message body as html  
                message.Body= "<table><tr><th> FromTheFaremerIsrael</th></tr><tr><td> שלום רב סיסמתך החדשה היא:</td></tr><tr><td>"+newPassword+ "</td></tr> <tr><td> חברת FromeTheFarmerIsrael </td></tr></table>";
                                                                                                                                                                                                                               
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("fromthefarmerisrael@gmail.com", "Tt123456@");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            }
            catch (Exception) {
                return false;
            }
            user.Password = GetMD5(newPassword);
            int c = m_db.SaveChanges();
            return c > 0;
        }
 
        //יצירת סיסמה חדשה מוצפנת
        private string NewPassword()
        {
            string password = "";
            char[] chars = "$%#@!?;:+-^&*abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            Random r = new Random();
            int LenghtPassword = r.Next(8, 13);//8-12//בגלל ש4 אני שם בכוח
            password += chars[r.Next(0, 13)];//0-12
            password += chars[r.Next(13, 39)];//13-38
            for (int i = 0; i < LenghtPassword; i++)
            {
                int RandomNumber = r.Next(0, 4);
                if (RandomNumber == 0)
                {
                    password += chars[r.Next(0, 13)];//0-12
                }
                else if (RandomNumber == 1)
                {
                    password += chars[r.Next(13, 39)];//13-38
                }
                else if (RandomNumber == 2)
                {
                    password += chars[r.Next(39, 49)];//38-48
                }
                else
                {
                    password += chars[r.Next(49, chars.Length)];//48-chars.Lenght
                }
            }
            password += chars[r.Next(39, 49)];//38-48
            password += chars[r.Next(49, chars.Length)];//48-chars.Lenght      
            return password;
        }



    }
}
